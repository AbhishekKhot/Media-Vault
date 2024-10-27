const dotenv = require("dotenv");
dotenv.config();

export default {
  development: {
    url: process.env.MASTER_DATABASE_URL,
    dialect: "postgres",
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: "postgres",
  },
  production: {
    url: process.env.MASTER_DATABASE_URL,
    dialect: "postgres",
  },
};
