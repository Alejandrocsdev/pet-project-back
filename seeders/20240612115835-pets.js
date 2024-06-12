'use strict'

/** @type {import('sequelize-cli').Migration} */

// 引入假資料模組
const { faker } = require('@faker-js/faker')

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = Array.from({ length: 10 }, () => ({
      name: faker.person.firstName(),
      age: faker.number.int({ min: 1, max: 15 }),
      size: faker.helpers.arrayElement(['small', 'medium', 'large']),
      image: `https://loremflickr.com/320/240/dog/?random=${Math.random() * 100}`
    }))

    await queryInterface.bulkInsert('Pets', data)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pets', null)
  }
}
