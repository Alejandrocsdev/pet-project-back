'use strict'

/** @type {import('sequelize-cli').Migration} */

const { processedCities } = require('./roadsData')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cities', processedCities)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', null)
  }
}
