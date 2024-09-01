const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) return res.status(401).json({ message: "unauthorized!" });

  //veryfing
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token expired" });
    }

    req.userId = decoded.userID;
    console.log(decoded);
    console.log("token verified!");
    next();
  });
};

module.exports = verifyToken;
