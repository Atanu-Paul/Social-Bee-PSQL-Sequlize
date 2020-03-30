//importing the required packages
const Sequlize = require("sequelize");

//importing the database connection
const db = require("../../config/db");

//defining the company employee schema
const depSchema = db.define(
  "Emp_department",
  {
    dep_name: {
      type: Sequlize.TEXT
    },
    number_of_emp: {
      type: Sequlize.SMALLINT
    }
  },
  { tableName: "Emp_department" }
);
module.exports = depSchema;
