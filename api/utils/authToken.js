const jwt = require("jsonwebtoken");

function authToken(req, res, next) {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      error: "Unauthorize",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      return res.status(401).json({
        error: "Unauthorize",
      });
    }
    req.userId = data.id
    next();
  });
}

module.exports = authToken;