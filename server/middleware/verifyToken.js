// const jwt = require("jsonwebtoken");

// require("dotenv/config");

// const verifyToken = async (req, res, next) => {
//   const authHeader =
//     req.headers["Authorization"] || req.header["authorization"];
//     console.log(authHeader)
//   try {
//     const token = authHeader.split(" ")[1];

//     if (!token) return res.status(404).json("Token is required");

//     //decoded token
//     const currentUser = await jwt.decode(token, process.env.TOKEN_SECRT_KEY);

//     req.currentUser = currentUser;
//     next();
//   } catch (err) {
//     return res.status(500).json("Invalid Token");
//   }
// };

// module.exports = verifyToken;