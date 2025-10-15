const mongoose = require("mongoose");

require("dotenv/config");
const connectionDb = mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Db Is Connected"));

module.exports = connectionDb;
