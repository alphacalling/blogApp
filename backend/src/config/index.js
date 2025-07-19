require("dotenv").config();

const NODE_ENV = process.env.NODE_ENV;
let DATABASE_URL;
if (NODE_ENV === "local") {
  DATABASE_URL = process.env.MONGODB_URL_LOCAL;
} else if (NODE_ENV === "development") {
  DATABASE_URL = process.env.MONGODB_URL_DEV;
} else {
  throw new Error(`Unknown NODE_ENV: ${NODE_ENV}`);
}

const config = {
  NODE_ENV,
  DATABASE_URL,
  JWT_CODE: process.env.JWT_SECRET,
  PORT: process.env.PORT_URL,
};

module.exports = config
