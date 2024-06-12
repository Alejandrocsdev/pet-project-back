'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Road extends Model {
    static associate(models) {}
  }
  Road.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      districtId: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'Road',
      tableName: 'Roads',
      underscored: true
    }
  )
  return Road
}
