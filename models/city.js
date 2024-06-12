'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      City.hasMany(models.District, { foreignKey: 'cityId', as: 'districts' })
    }
  }
  City.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'City',
      tableName: 'Cities',
      underscored: true
    }
  )
  return City
}
