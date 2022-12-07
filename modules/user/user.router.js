
const {
  signupValidation,
  signinValidation,
} = require("../../validation/validation");
const { signup, signin } = require("./controller/registration");

const router = require("express").Router();
router.post("/signup", signupValidation(), signup);
router.post("/signin", signinValidation(), signin);

module.exports = router;
