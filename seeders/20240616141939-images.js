'use strict'

/** @type {import('sequelize-cli').Migration} */

// 引入假資料模組
const { faker } = require('@faker-js/faker')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        link: 'https://i.imgur.com/eBJWiig.jpeg',
        delete_data: 'wPoA5RXaXS3ITES',
        entity_id: 1,
        entity_type: 'pet'
      },
      {
        link: 'https://i.imgur.com/cmkht1z.jpeg',
        delete_data: 'jQDND3O2VuKpn73',
        entity_id: 3,
        entity_type: 'pet'
      },
      {
        link: 'https://i.imgur.com/D4HuoZw.jpeg',
        delete_data: '2jZC5tqKvJCnprf',
        entity_id: 5,
        entity_type: 'pet'
      },
      {
        link: 'https://i.imgur.com/zWAkzOb.jpeg',
        delete_data: 'Vl8V61lk5C2p62d',
        entity_id: 7,
        entity_type: 'pet'
      },
      {
        link: 'https://i.imgur.com/kEsN8mI.jpeg',
        delete_data: 'GYoY51MHrZvM29F',
        entity_id: 9,
        entity_type: 'pet'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null)
  }
}
