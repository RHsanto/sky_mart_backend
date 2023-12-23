
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getEmailFromToken = require("../../utils");
const User = require("./User");
const SECRET_KEY = process.env.SECRET_KEY;


const register = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email: email,
      password: hashPassword,
      userName: userName,
    });
    newUser.token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      SECRET_KEY,
      { expiresIn: 86400 }
    );

    const response = await newUser.save();
    const {email: userEmail, userName: name, token, _id} = response || {}
    if (response?._id) {
      return res
        .status(201)
        .json({ message: "User registered successfully!", user: {email: userEmail, userName: name, token, _id} });
    }
    return res
      .status(500)
      .json({ error: "Sorry, You can't signup now try later" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const loggedInUser = await User.findOne({ email: email });
    if (!loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, loggedInUser.password);
    if (!matchPassword) {
      return res.status(404).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { email: loggedInUser.email, id: loggedInUser._id },
      SECRET_KEY,
      { expiresIn: 86400 }
    );
    loggedInUser.token = token;
    await loggedInUser.save();

    const {
      email: userEmail,
      token: userToken,
      userName,
      _id,
    } = loggedInUser || {};
    res
      .status(201)
      .json({  message: "User login successful!", user: { email: userEmail, userName, token: userToken, _id } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to login" });
  }
};

const getCurrentUser = async (req, res) => {
  const email = getEmailFromToken(req.headers.authorization);

  if (!email) {
    res.status(401).json({
      error: "You are not authorized!",
    });
  }

  const user = await User.findOne({ email }).select({
    password: 0,
  });

  if (user?.email) {
    return res.status(200).json({
      message: "User fetched successfully!",
      user,
    });
  }

  res.status(404).json({ error: "No user found!" });
};

module.exports = {  register, signin, getCurrentUser };
