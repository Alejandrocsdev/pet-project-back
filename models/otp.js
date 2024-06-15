'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Otp extends Model {
    static associate(models) {}
  }
  Otp.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      otp: {
        allowNull: false,
        type: DataTypes.STRING
      },
      expireTime: {
        allowNull: false,
        type: DataTypes.BIGINT,
        defaultValue: 0
      },
      attempts: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'Otp',
      tableName: 'Otps',
      underscored: true
    }
  )
  return Otp
}
