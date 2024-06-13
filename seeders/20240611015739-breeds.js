'use strict'

/** @type {import('sequelize-cli').Migration} */

// 引入假資料模組
const { faker } = require('@faker-js/faker')

const uniqueDogNames = new Set()

while (uniqueDogNames.size < 10) {
  uniqueDogNames.add(faker.animal.dog())
}

const data = Array.from(uniqueDogNames).map((name) => ({ name }))

data.unshift({ name: 'Other' })

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Breeds', data)
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Breeds', null)
  }
}
