require("dotenv").config();

module.exports = {
  development: {
    url: process.env.WRITE_DATABASE_URL,
    dialect: "postgres",
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: "postgres",
  },
  production: {
    url: process.env.WRITE_DATABASE_URL,
    dialect: "postgres",
  },
};
