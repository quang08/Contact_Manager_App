const { constants } = require("../constants");
const errorHander = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.status(400).json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.NOT_FOUND:
      res.status(404).json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.FORBIDDEN:
      res.status(403).json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    case constants.SERVER_ERROR:
      res.status(500).json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stackTrace,
      });
      break;
    default:
      console.log("No error");
      break;
  }
};

module.exports = errorHander;
