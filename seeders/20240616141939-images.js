'use strict'

/** @type {import('sequelize-cli').Migration} */

const data = []

for (let i = 1; i <= 10; i++) {
  data.push({
    link: null,
    delete_data: null,
    entity_id: i,
    entity_type: 'pet'
  })
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', data)
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null)
  }
}
