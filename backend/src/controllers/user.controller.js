const { JWT_CODE } = require("../config/index");
const userSchema = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if ((!userName, !email, !password)) {
      return res.status(400).json({
        success: false,
        message: "All the fields are required",
      });
    }
    const existingUser = await userSchema.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email id is already registered",
      });
    }
    // pass hashing
    var salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await userSchema.create({
      userName,
      email,
      password: hashPassword,
    });

    res.status(200).send({
      success: true,
      message: "user created successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// loginUser
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Plz provide all neccessary details",
    });
  }
  //  find in db
  const user = await userSchema.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User is not present in Database",
    });
  }
  //compare the password
  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (!isMatchPassword) {
    return res.status(401).json({
      success: false,
      message: "User's password is not matched",
    });
  }
  // generating jwt token
  const token = jwt.sign({ id: user._id }, JWT_CODE, {
    expiresIn: "2d",
  });
  user.password = undefined;

  return res.status(200).json({
    success: true,
    message: "user logged In success",
    token: token,
    data: user,
  });
};
