//importing the required packages
const { Sequlize, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

//importing the database connection
const db = require("../../config/db");

const UserSchema = db.define(
  "users",
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      msg: "Please enter name",
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      is: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      isEmail: true,
      msg: "Email formate not correct",
    },
    role: {
      type: DataTypes.ENUM("user", "ngoRep"),
      allowNull: false,
      defaultValue: "user",
    },
    profilepic: {
      type: DataTypes.TEXT,
      defaultValue: "photos/no-photo.png",
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      is: /^[0-9a-f]{64}$/i,
      msg: "Password in wrong formate or not given",
    },
    resetPasswordToken: DataTypes.STRING,
    resetPasswordExpire: DataTypes.DATE,

    // organizationId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   onDelete: "CASCADE",
    //   references: {
    //     model: "ngoDatas",
    //     key: "id",
    //     as: "organizationId",
    //   },
    // },
  },

  { timestamps: true },
  { tableName: "users" }
);

// Encrypt password using bcrypt
UserSchema.beforeSave(async function (UserSchema) {
  const salt = await bcrypt.genSalt(10);
  UserSchema.password = await bcrypt.hash(UserSchema.password, salt);
});

// Sign JWT and return
UserSchema.prototype.getSignedJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in database
UserSchema.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
UserSchema.prototype.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  // is being called on actual user,so this is used to access field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire --10 minutes setting
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken; //it will be stored
};
//exporting the schema
module.exports = UserSchema;

// CREATE TABLE public.user
// (
//     id bigserial NOT NULL,
//    	name text,
//      email text,
//     role char (50),
//     profilepic text,
//     password text,
//      resetPasswordToken text,
//     resetPasswordExpire date,
//     PRIMARY KEY (id)
// )
// WITH (
//     OIDS = FALSE
// );

// ALTER TABLE public.user
//     OWNER to xvuoibaw;
