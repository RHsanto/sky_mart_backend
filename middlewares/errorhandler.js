const createError = require("http-errors");

const notFoundHandler = (req, res, next) => {
  next(createError(404, "Your requested content was not found!"));
};

const handleAllError = (err, req, res, next) => {
  if (req.headerSent) {
    next("There was a problem!");
  } else {
    if (err.message) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "There was an problem in server side" });
    }
  }
};

module.exports = {
    notFoundHandler,
  handleAllError,
};
