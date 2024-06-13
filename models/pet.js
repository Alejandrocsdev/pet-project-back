'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    static associate(models) {
      Pet.belongsTo(models.Breed, {
        foreignKey: 'breedId',
        as: 'breed',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
      Pet.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'owner',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Pet.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      age: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      size: {
        allowNull: false,
        type: DataTypes.ENUM('small', 'medium', 'large')
      },
      image: {
        allowNull: true,
        type: DataTypes.STRING
      },
      breedId: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'Pet',
      tableName: 'Pets',
      underscored: true
    }
  )
  return Pet
}
