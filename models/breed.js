'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Breed extends Model {
    static associate(models) {}
  }
  Breed.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true
      }
    },
    {
      sequelize,
      modelName: 'Breed',
      tableName: 'Breeds',
      underscored: true
    }
  )
  return Breed
}
