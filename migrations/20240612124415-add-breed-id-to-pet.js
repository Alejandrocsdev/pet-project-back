'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Pets', 'breed_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Breeds',
        key: 'id'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Pets', 'breed_id')
  }
}
