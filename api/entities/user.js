const { DataTypes } = require('sequelize')
const db = require('../../db')

  let user = db.define('user', {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    user_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    expire: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
  }, 
  {
    tableName:'user',
    freezeTableName: true,
    timestamps: false,
  });

 module.exports = user
