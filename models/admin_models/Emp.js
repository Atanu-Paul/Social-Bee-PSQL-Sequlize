//importing the required packages
const { Sequlize, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

//importing the database connection
const db = require("../../config/db");

//defining the company employee schema
const empSchema = db.define(
  "Emps",
  {
    //emp_number is not same as emp Object Id it is the 6 digit number given by the company
    emp_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      msg: "Please enter Employee Number",
    },
    emp_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      msg: "Please enter name",
    },
    emp_email: {
      type: DataTypes.TEXT,
      allowNull: false,
      is: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      isEmail: true,
      msg: "Email formate not correct",
    },
    emp_password: {
      type: DataTypes.TEXT,
      allowNull: false,
      is: /^[0-9a-f]{64}$/i,
      msg: "Password in wrong formate or not given",
    },
    resetPasswordToken: DataTypes.STRING,
    resetPasswordExpire: DataTypes.DATE,
    emp_access_lvl: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      msg: "Acess level must be given between 1-5",
    },
    emp_desgination: {
      type: DataTypes.TEXT,
      allowNull: false,
      msg: "Enter employee Designation",
    },
    dep_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Emp_department",
        key: "id",
      },
    },
  },
  { timestamps: true },
  { tableName: "Emps" }
);
//hashing the password before saving in the databse
empSchema.beforeSave(async function (empSchema) {
  const salt = await bcrypt.genSalt(10);
  empSchema.emp_password = await bcrypt.hash(empSchema.emp_password, salt);
});
//generating jwt token for login
empSchema.prototype.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// method to match the plain text password with the encrypted password in the database for login
empSchema.prototype.matchPassword = async function (emp_password) {
  return await bcrypt.compare(emp_password, this.emp_password);
};
//generating and hashing the password reset token
empSchema.prototype.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hashing the token and storing in the database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //setting the expire time
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken; //it will be stored
};
//exporting the schema
module.exports = empSchema;

// CREATE TABLE public.emps
// (
//     id bigserial NOT NULL,
//     emp_number character varying(100),
//     emp_name text,
//     emp_email text,
//     emp_password text,
//     emp_access_lvl smallint,
//     emp_desgination text,
//     dep_id bigint,
//     PRIMARY KEY (id),
// 	FOREIGN KEY (dep_id) REFERENCES public.emp_department (id)
// )
// WITH (
//     OIDS = FALSE
// );

// ALTER TABLE public.emps
//     OWNER to xvuoibaw;
