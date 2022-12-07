const userModel = require("../../../DB/model/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const signup = async (req, res) => {
  const { first_name, last_name, age, email, password } = req.body;

  try {
    const findUser = await userModel.findOne({
      email,
    });

    if (findUser) {
      res.json({ message: "email exist" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 8);
      const newUser = new userModel({
        first_name,
        last_name,
        age,
        email,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();

      res.json({ message: "success", savedUser });
    }
  } catch (err) {
    res.json({ message: err.name });
  }
};
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = jwt.sign({ id: user._id, isLoggedIn: true }, "shhhh");
        res.json({ message: "success", token });
      } else {
        res.json({ message: "not match password" });
      }
    } else {
      res.json({ message: "in-valid email or password", user });
    }
  } catch (err) {
    res.json({ message: err.name });
  }
};
module.exports = {
  signup,
  signin,
};
