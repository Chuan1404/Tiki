const jwt = require("jsonwebtoken");

function authorizeUser(userRole) {
  return (req, res, next) => {
    if (userRole == req.userRole) {
      next();
      return;
    }
    res.status(403).json({
      error: "You dont have permission to access this",
    });
  };
}

module.exports = authorizeUser;
