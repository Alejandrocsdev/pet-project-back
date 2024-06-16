'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.Pet, {
        foreignKey: 'entityId',
        constraints: false,
        scope: { entityType: 'pet' }
      })
    }
  }
  Image.init(
    {
      link: {
        allowNull: true,
        type: DataTypes.STRING
      },
      deleteData: {
        allowNull: true,
        type: DataTypes.STRING
      },
      entityId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      entityType: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Image',
      tableName: 'Images',
      underscored: true
    }
  )
  return Image
}
