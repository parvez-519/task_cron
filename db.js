const { Sequelize } = require('sequelize');
require('dotenv').config()

const db = new Sequelize('cronjob', 'root', 'root', {
  host: 'localhost',
  dialect: "mysql",
  // timezone: 'Asia/Calcutta'
}
)

try {
  db.authenticate();
} catch (error) {
}

db.sync({}).then(() => {
})
module.exports = db


