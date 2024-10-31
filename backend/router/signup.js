const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { ValidateUser } = require("../MIddlewares/signupAuth");
const { ValidateRetailer } = require("../MIddlewares/signupAuth");
const Retailer = require("../models/retailer");
router.post("/user",ValidateUser, async (req, res) => {
  let { name, email, password } = req.body.formData;
  let getuser = await User.findOne({ email: email });
  let getretailer = await User.findOne({ email: email });
  if (getuser || getretailer)
    return res.json({ error: "Email already Exists" });
  const hash = bcrypt.hashSync(password, saltRounds);
  password = hash;
  let newuser = new User({ name, email, password });
  await newuser.save();
  return res.json(newuser);
});

router.post("/retailer", ValidateRetailer, async (req, res) => {
  let { name, email, password, shopname, shoptype, address, type } =
    req.body.formData;

  let getuser = await User.findOne({ email: email });
  let getretailer = await Retailer.findOne({ email: email });
  if (getuser || getretailer)
    return res.json({ error: "Email already Exists" });
  const hash = bcrypt.hashSync(password, saltRounds);
  password = hash;
  let newretailer = new Retailer({
    name,
    email,
    password,
    shopname,
    shoptype,
    address,
    type,
  });

  await newretailer.save();
  return res.json(newretailer);
});
module.exports = router;
