const Joi = require("joi");
const signupSchema = Joi.object({
  first_name: Joi.string().alphanum().required(),
  last_name: Joi.string().alphanum().required(),
  age: Joi.number().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    .required(),
});

const signinSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
    .required(),
});

const signupValidation = () => {
  return (req, res, next) => {
    const { first_name, last_name, age, email, password } = req.body;
    let { error } = signupSchema.validate({ first_name, last_name, age, email, password }, { abortEarly: false });
    if (error == undefined) {
      next();
    } else {
      res.json({ error });
    }
  };
};

const signinValidation = () => {
  return (req, res, next) => {
    const { email, password } = req.body;
    let { error } = signinSchema.validate({ email, password }, { abortEarly: false });
    if (error == undefined) {
      next();
    } else {
      res.json({ error });
    }
  };
};

module.exports = { signupValidation, signinValidation };
