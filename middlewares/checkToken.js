const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const checkLogin = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded.email) {
        next();
      }
    } catch (error) {
      res.status(500).json({
        error: "Authentication failed!",
      });
    }
  } else {
    return res
      .status(403)
      .send({ error: "A token is required for authentication" });
  }
};

module.exports = checkLogin;
