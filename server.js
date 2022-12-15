const express = require("express");
const app = express();
const bodyparser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
let router = require("./api/router");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
app.use("/", router);
const cron = require("node-cron");
const userRepo = require("./api/entities/user");
const { Op, DATEONLY } = require("sequelize");
const { json } = require("body-parser");
const { DATE } = require("sequelize");

var dateObj = new Date();
console.log(dateObj);
var onlyDate=dateObj.getFullYear() + "-" +(dateObj.getMonth()+1) + "-" +dateObj.getDate()
console.log("---only date---",onlyDate)

async function check() {
  const dates = await userRepo.findAll({
    where: {},
    attributes: {
      exclude: ["user_id", "user_name"],
    },
  });
  for (let date of dates) {
    const dateValue = Object.values(JSON.parse(JSON.stringify(date)));
    const newDate = new Date(dateValue);
    const numOfHours = 5.5;
    newDate.setTime(newDate.getTime() + numOfHours * 60 * 60 * 1000);
    let oDate=newDate.getFullYear() + "-" +(newDate.getMonth()+1) + "-" +newDate.getDate()
    console.log(newDate);
    console.log(oDate);
    if(oDate===onlyDate)
    {
      //  cron.schedule("0 0 * * *", () => {
      cron.schedule(" */2 * * * * *", () => {
          console.log("-----inside cron-----")
          userRepo.destroy({
            where: {
              expire: {
                [Op.lte]: newDate,
              },
            },
          });
        });
    }
  }
}

async function init() {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`Now listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err.message);
  }
}

check();

init();
