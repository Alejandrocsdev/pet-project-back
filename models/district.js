'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    static associate(models) {}
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
