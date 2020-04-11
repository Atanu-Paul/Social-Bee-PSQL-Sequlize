const fs = require("fs");
const Sequelize = require("sequelize");
const colors = require("colors");
const dotenv = require("dotenv");

//Bring the env variables here
dotenv.config({ path: "./config/config.env" });

//BRing up th Models
const ngoData = require("./models/ngo_models/ngoData");
const emp_department = require("./models/admin_models/Emp_department");

//bring up the database connection
const sequelize = new Sequelize(process.env.ELEPHANT_SQL_URI);

//Read the JSON Files
const ngomockData = JSON.parse(
  fs.readFileSync(`${__dirname}/mockData/ngoData.json`, "utf-8")
);
const emp_deparrtmentmockData = JSON.parse(
  fs.readFileSync(`${__dirname}/mockData/emp_departmentData.json`, "utf-8")
);

//import into DB
const importData = async () => {
  try {
    await emp_department.bulkCreate(emp_deparrtmentmockData);
    await ngoData.bulkCreate(ngomockData);

    console.log("DATA DUMPED IN DB".green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//TO delete all the data
const deleteData = async () => {
  try {
    await emp_department.destroy({ where: {} });
    await ngoData.destroy({ where: {} });
    console.log("DATA WIPED OUT FROM DB".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//command check and procees with seeding
if (process.argv[2] === "-add") {
  importData();
} else if (process.argv[2] === "-delete") {
  deleteData();
}
