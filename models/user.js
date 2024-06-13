'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }
  User.init(
    {
      username: {
        allowNull: false,
        type: DataTypes.STRING
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING
      },
      district: {
        allowNull: false,
        type: DataTypes.STRING
      },
      road: {
        allowNull: false,
        type: DataTypes.STRING
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      underscored: true
    }
  )
  return User
}
