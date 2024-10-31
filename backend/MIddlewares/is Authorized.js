if (process.env.NODE_ENV != "production") require("dotenv").config();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const isAuthorized = (req, res, next) => {
  const access_token = req.cookies.access_token;
  if (!access_token) return res.json({ expired:true,error:"Your Session has expired"});
  else {
    jwt.verify(access_token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err)
        return res.json({ valid: false, message: "Invalid Token" });
      }
      else {
        req.id = decoded.id;
        next();
      }
    });
  }
};
module.exports=isAuthorized
