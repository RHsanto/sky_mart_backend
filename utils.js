const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const getEmailFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const email = decoded.email;
    return email;
  } catch (error) {
    return null;
  }
};


module.exports = getEmailFromToken;