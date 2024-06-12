'use strict'

/** @type {import('sequelize-cli').Migration} */

const { processedDistricts } = require('./roadsData')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Districts', processedDistricts)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Districts', null)
  }
}
