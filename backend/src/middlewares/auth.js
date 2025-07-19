const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config/index");
const userSchema = require("../models/user.model");

exports.auth = (req, res, next) => {
  try {
    const token = req.body.token;
    console.log(token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }
    try {
      const decode = jwt.verify(token, JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is Invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating",
    });
  }
};

exports.isUser = async (req, res, next) => {
  try {
    if (req.user.role !== "User") {
      return res.status(401).json({
        success: false,
        message: "This protected route for User",
      });
    }
    next();
    return res.status(200)({
      success: true,
      message: "welcome to protected routes of user",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user can not be verified",
    });
  }
};

// exports.auth = async (req, res, next) => {
//     try {
//       // get token
//       const token = req.headers["authorization"].split(" ")[1];
//       jwt.verify(token, JWT_SECRET, (err, decode) => {
//         if (err) {
//           return res.status(401).send({
//             success: false,
//             message: "Un-Authorize User",
//           });
//         } else {
//           req.body.id = decode.id;
//           next();
//         }
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         success: false,
//         message: "Please provide Auth Token",
//         error,
//       });
//     }
//   };

// exports.admin = async (req, res, next) => {
//     try {
//       const user = await userSchema.findById(req.body.id);
//       if (user.usertype !== "admin") {
//         return res.status(401).send({
//           success: false,
//           message: "Only Admin ACess ",
//         });
//       } else {
//         next();
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         success: false,
//         message: "Un-AUthorized ACCESS",
//         error,
//       });
//     }
//   };
