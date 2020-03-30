// //importing the required packages
const { Sequlize, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

//importing the database connection
const db = require("../../config/db");

//defining the company employee schema
const empSchema = db.define(
  "Emps",
  {
    //emp_number is not same as emp Object Id it is the 6 digit number given by the company
    emp_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      msg: "Please enter Employee Number"
    },
    emp_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      msg: "Please enter name"
    },
    emp_email: {
      type: DataTypes.TEXT,
      allowNull: false,
      is: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      isEmail: true,
      msg: "Email formate not correct"
    },
    emp_password: {
      type: DataTypes.TEXT,
      allowNull: false,
      is: /^[0-9a-f]{64}$/i,
      msg: "Password in wrong formate or not given"
    },
    emp_access_lvl: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      msg: "Acess level must be given between 1-5"
    },
    emp_desgination: {
      type: DataTypes.TEXT,
      allowNull: false,
      msg: "Enter employee Designation"
    },
    dep_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Emp_department",
        key: "id"
      }
    }
  },
  { timestamps: true },
  { tableName: "Emps" }
);
//hashing the password before saving in the databse
empSchema.beforeCreate(async function(empSchema) {
  const salt = await bcrypt.genSalt(10);
  empSchema.emp_password = await bcrypt.hash(empSchema.emp_password, salt);
});
empSchema.prototype.validPassword = async function(emp_password) {
  return await bcrypt.compare(emp_password, this.emp_password);
};
//exporting the schema
module.exports = empSchema;
