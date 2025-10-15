const userModel = require("../model/user-model");

const statusText = require("../utils/statusText");

const generateToken = require("../jwt/generateToken");

const bcrypt = require("bcryptjs");

const { registerValidation } = require("../validation/user-validation");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ statusText: statusText.SUCCESS, data: users });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const user = await userModel.findOne({ userName: userName });
    res.status(200).json({ statusText: statusText.SUCCESS, data: user });
  } catch (err) {
    res.status(500).json(err);
  }
};

const register = async (req, res) => {
  const userValidation = registerValidation.safeParse(req.body);

  if (userValidation.success) {
    try {
      const { userName, email, password } = req.body;
      const user = await userModel.findOne({ email: email });

      // check if user is found
      if (user) {
        return res.status(400).json("This user is found");
      }
      // hashing to password
      const hashedPassword = await bcrypt.hash(password, 10);

      // create new User
      const newUser = userModel({
        userName,
        email,
        password: hashedPassword,
      });

      const token = await generateToken({ userName, email });

      await newUser.save();
      return res
        .status(201)
        .json({ statusText: statusText.SUCCESS, data: newUser, token: token });
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(404).send("this input is invalid");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) return res.status(404).json("email or password is wrong");

    return res.status(200).json("Login Successfuly");
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  register,
  login,
};
