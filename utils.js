const jwt = require("jsonwebtoken");
const JWT_SECRET = "NETFLIX7d-^5&G#x9p@2C!s";

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