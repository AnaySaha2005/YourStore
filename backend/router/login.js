if(process.env.NODE_ENV!="production")
require('dotenv').config()
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Retailer = require("../models/retailer");

router.post("/", async (req, res) => {
  try {
    let getretailer = await Retailer.findOne({
      email: req.body.email,
    }).populate("itemList");
    let getuser = await User.findOne({ email: req.body.email });
    if (getretailer) {
      if (bcrypt.compareSync(req.body.password, getretailer.password)) {
        const token = jwt.sign(
          { id: getretailer._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
            
          }
        );
        let { password, ...rest } = getretailer._doc;

        res
          .cookie("access_token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: "3600000",
          })
          .status(200)
          .json({ sucess: "Successfully logged in", user: rest });
      } else return res.json({ error: "Authentication failed" });
    } else if (getuser) {
      if (bcrypt.compareSync(req.body.password, getuser.password)) {
        const token = jwt.sign({ id: getuser._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        let { password, ...rest } = getuser._doc;

        res
          .cookie("access_token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: "3600000",
          })
          .status(200)
          .json({ sucess: "Successfully logged in", user: rest });
      } else return res.json({ error: "Authentication failed" });
    } else return res.json({ error: "No user with such email" });
  } catch (e) {
    return res.json(e);
  }
});
module.exports=router;
