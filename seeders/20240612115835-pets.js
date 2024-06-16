'use strict'

/** @type {import('sequelize-cli').Migration} */

// 引入假資料模組
const { faker } = require('@faker-js/faker')

module.exports = {
  async up(queryInterface, Sequelize) {
    const [breeds, users] = await Promise.all([
      queryInterface.sequelize.query('SELECT id FROM Breeds;', {
        type: queryInterface.sequelize.QueryTypes.SELECT
      }),
      queryInterface.sequelize.query('SELECT id FROM Users;', {
        type: queryInterface.sequelize.QueryTypes.SELECT
      })
    ])

    const data = Array.from({ length: 10 }, () => ({
      name: faker.person.firstName(),
      age: faker.number.int({ min: 1, max: 15 }),
      size: faker.helpers.arrayElement(['small', 'medium', 'large']),
      breed_id: breeds[Math.floor(Math.random() * breeds.length)].id,
      user_id: users[Math.floor(Math.random() * users.length)].id
    }))

    await queryInterface.bulkInsert('Pets', data)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pets', null)
  }
}
