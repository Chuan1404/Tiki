const jwt = require("jsonwebtoken");

function authToken(req, res, next) {
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    res.status(401).json({
      error: "Unauthorize",
    });
    return 
  }

  const token = authorizationHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      res.status(401).json({
        error: "Unauthorize",
      });
      return 
    }
    req.userId = data.id;
    req.userRole = data.role;
    next();
  });
}

module.exports = authToken;
