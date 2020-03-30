//importing the sequlize orm
const { Sequelize } = require("sequelize");
require("colors");

//connecting the app with the postgres sql instance hosted on aws with the elephannt sql platform

const connectDB = new Sequelize(
  "cmanyyby",
  "cmanyyby",
  "L519qUGRhgac5oci8VNrmxK-qHD-guRJ",
  {
    host: "rosie.db.elephantsql.com",
    dialect: "postgres"
  }
);
connectDB
  .authenticate()
  .then(() => {
    console.log(
      "Postgres database has been connected sucessfully".green.underline
    );
  })
  .catch(err => {
    console.error(
      "Connection failed Database not connected  error:".red.underline,
      err
    );
  });
module.exports = connectDB;
