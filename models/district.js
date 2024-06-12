'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    static associate(models) {
      District.belongsTo(models.City, { foreignKey: 'cityId', as: 'city' })
      District.hasMany(models.Road, { foreignKey: 'districtId', as: 'roads' })
    }
  }
  District.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      cityId: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'District',
      tableName: 'Districts',
      underscored: true
    }
  )
  return District
}
