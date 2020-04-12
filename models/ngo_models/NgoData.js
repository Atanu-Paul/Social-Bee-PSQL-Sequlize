//importing the required packages
const { Sequlize, DataTypes } = require("sequelize");

//importing the database connection
const db = require("../../config/db");

//defining the ngo schema
const ngoSchema = db.define(
  "ngoDatas",
  {
    directorName: {
      type: DataTypes.TEXT,
      allowNull: false,
      msg: "Have to be 20 max",
    },
    phone: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      msg: "Phone number can not be longer than 15 characters",
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      is: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      isEmail: true,
      msg: "Email formate not correct",
    },
    ngoName: {
      type: DataTypes.TEXT,
      allowNull: false,
      msg: "Name can't be more than 50 characters",
    },
    ngoDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
      msg: "Must be 500 characters",
    },
    ngoRegistrationNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      msg: "Please add the 10 Digit Unique Registration Number",
    },
    ngoFounded: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      msg: "Please mention the year of Foundation",
    },
    ngoWorkers: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      msg: "Please add Number of Workers",
    },
    ngoAccomodation: {
      type: DataTypes.BOOLEAN,
    },
    ngoWebsiteUrl: {
      type: DataTypes.TEXT,
      is: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      msg: "Please use a valid URL with HTTP or HTTPS",
    },
    ngoAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ngoImg: {
      type: DataTypes.TEXT,
      defaultValue: "photos/no-photo.png",
    },
    ngoFunding: {
      type: DataTypes.ENUM("public", "private"),
      allowNull: false,
      defaultValue: "Not Mentioned",
    },
    ngo_group: {
      type: DataTypes.ENUM("humanService", "animalService", "natureService"),
      allowNull: false,
      defaultValue: "Not Mentioned",
    },
    category: {
      type: DataTypes.ENUM(
        "orphanage",
        "shelterHouse",
        "oldAge",
        "otherHumanService",
        "cowShelter",
        "birdShelter",
        "dogShelter",
        "otherAnimalService",
        "saveWaterBodies",
        "saveTrees",
        "saveAir",
        "otherNatureService"
      ),
      allowNull: false,
      defaultValue: "Not Mentioned",
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  { timestamps: true },
  { tableName: "ngoDatas" }
);

//exporting the schema
module.exports = ngoSchema;

// CREATE TABLE public.nogDatas
// (
//     id bigserial NOT NULL,
//     directorName text,
//     phone smallint,
//     email text,
//     ngoName text,
//     ngoDescription text,
//     ngoRegistrationNumber bigint,
//     ngoFounded smallint,
// 	ngoWorkers smallint,
// 	ngoAccomodation boolean,
// 	ngoWebsiteUrl text,
// 	ngoAddress text,
// 	ngoImg text,
// 	ngoFunding text,
// 	ngo_group text,
// 	category text,
// 	user_id bigint,
// 	createdAt date,
// 	updatedAt date,
//     PRIMARY KEY (id),
// 	FOREIGN KEY (user_id) REFERENCES public.users (id)
// )
// WITH (
//     OIDS = FALSE
// );

// ALTER TABLE public.nogDatas
//     OWNER to xvuoibaw;

// Warehouse.hasMany(Location , {foreignKey: 'location_warehouse', sourceKey: 'warehouse_code'});
// Location.belongsTo(Warehouse , {foreignKey: 'location_warehouse', targetKey: 'warehouse_code'});
