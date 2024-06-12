'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Breed extends Model {
    static associate(models) {
      Breed.hasMany(models.Pet, { foreignKey: 'breedId' })
    }
  }
  Breed.init(
    {
      name: {
        allowNull: false,
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
