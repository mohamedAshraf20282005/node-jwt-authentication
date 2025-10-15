const userModel = require("../model/user-model");

const statusText = require("../utils/statusText");

const generateToken = require("../jwt/generateToken");

const bcrypt = require("bcryptjs");

const dataValidation = require("../validation/user-validation");

const register = async (req, res) => {
  const inputValidation = dataValidation.safeParse(req.body);

  if (!inputValidation.success)
    return res.status(404).send("this input is invalid");

  try {
    const { userName, email, password } = req.body;
    const user = await userModel.findOne({ $or: [{ userName }, { email }] });

    console.log(user);
    if (user) {
      if (user.userName == userName) {
        return res.send("user name is invalid");
      } else if (user.email == email) return res.send("email is invalid");
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
    const { password: _, __v, ...safeData } = newUser.toObject();

    await newUser.save();

    return res.status(201).json({
      statusText: statusText.SUCCESS,
      data: safeData,
      token: token,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const login = async (req, res) => {
  const inputValidation = dataValidation.safeParse(req.body);

  if (!inputValidation.success)
    return res.status(404).send("this input is invalid");

  try {
    const { userName, email, password } = req.body;
    const user = await userModel.findOne({ $or: [{ email }, { userName }] });

    if (!user) return res.status(404).json("email or password is wrong");

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) return res.send("email or password is wrong");

    const { password: _, __v, ...safeData } = user.toObject();

    const token = await generateToken({ userName, email });

    return res
      .status(200)
      .json({ statusText: statusText.SUCCESS, data: safeData, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  register,
  login,
};
