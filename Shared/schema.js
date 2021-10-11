const joi = require("joi");

const schema = {
  registerSchema: joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),

  loginSchema: joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
  }),

  postSchema: joi.object({
    title: joi.string().min(4).max(10).required(),
    body: joi.string().max(100).required(),
  }),
};

module.exports = schema;
