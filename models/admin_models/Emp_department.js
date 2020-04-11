//importing the required packages
const Sequlize = require("sequelize");

//importing the database connection
const db = require("../../config/db");

//defining the company employee schema
const depSchema = db.define(
  "Emp_department",
  {
    dep_name: {
      type: Sequlize.TEXT,
      msg: "Please enter Department Name",
    },
    number_of_emp: {
      type: Sequlize.SMALLINT,
      msg: "Please enter Number of employee",
    },
  },
  { tableName: "emp_department" }
);
module.exports = depSchema;
