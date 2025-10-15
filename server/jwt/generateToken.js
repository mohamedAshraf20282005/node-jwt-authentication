const jwt = require("jsonwebtoken");

require("dotenv/config");

module.exports = async (baylod) => {
  return await jwt.sign(baylod, process.env.TOKEN_SECRT_KEY, {
    expiresIn: "10m",
  });
};
