'use strict'

/** @type {import('sequelize-cli').Migration} */

const { processedRoads } = require('./roadsData')

console.log(processedRoads.length)

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roads', processedRoads)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roads', null)
  }
}
