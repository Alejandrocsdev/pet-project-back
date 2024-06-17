'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Pet, {
        foreignKey: 'userId',
        as: 'pets'
      })
      User.hasOne(models.Image, {
        foreignKey: 'entityId',
        scope: { entityType: 'user' },
        as: 'avatar'
      })
    }
  }
  User.init(
    {
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
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
