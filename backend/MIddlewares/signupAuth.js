const Joi = require("joi");
const ValidateUser = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(100).required(),
    type: Joi.string().required(),
  });
  const { error } = schema.validate(req.body.formData);
  if (error){
    console.log(error)
    return res.status(400).json({ message: "Authurization failed", error });
  }
  next();
};

const ValidateRetailer = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    type: Joi.string().min(3).max(100).required(),
    address: Joi.string().min(3).max(100).required(),
    shopname: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(100).required(),
    shoptype: Joi.string().required(),
  });
  const { error } = schema.validate(req.body.formData);
  if (error)
    return res.status(400).json({ error: error.details[0].message});
  next();
};
module.exports={ValidateUser,ValidateRetailer}