const mongoose = require("mongoose");
const { DATABASE_URL } = require("./index");

const ConnectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log(`connected to database: ${mongoose.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};
module.exports = ConnectDB;
