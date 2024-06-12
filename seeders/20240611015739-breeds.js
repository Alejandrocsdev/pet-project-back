'use strict'

/** @type {import('sequelize-cli').Migration} */

// 引入假資料模組
const { faker } = require('@faker-js/faker')

const data = Array.from({ length: 10 }, () => ({
  name: faker.animal.dog()
}))

data.push({ name: 'Other' })

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Breeds', data)
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Breeds', null)
  }
}
