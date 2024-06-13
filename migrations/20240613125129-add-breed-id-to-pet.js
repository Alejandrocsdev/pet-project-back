'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Pets', 'breed_id', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'Breeds',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Pets', 'breed_id')
  }
}
