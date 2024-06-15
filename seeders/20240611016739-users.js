'use strict'

/** @type {import('sequelize-cli').Migration} */

// 引入環境變數
require('dotenv').config()

// 引入加密模組
const encrypt = require('../utils/encrypt')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'root',
        password: await encrypt.hash('root'),
        email: 'root@gmail.com',
        phone: '0912345678',
        city: '臺北市',
        district: '士林區',
        road: '士東路',
        address: '8號8樓'
      },
      {
        username: 'user1',
        password: await encrypt.hash('user1'),
        email: process.env.TEST_EMAIL || 'user2@gmail.com',
        phone: process.env.TEST_PHONE || '0923456789',
        city: '臺中市',
        district: '霧峰區',
        road: '新豐路',
        address: '10號10樓'
      },
      {
        username: 'user2',
        password: await encrypt.hash('user2'),
        email: 'user2@gmail.com',
        phone: '0934567890',
        city: '高雄市',
        district: '橋頭區',
        road: '村中路',
        address: '5號5樓'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null)
  }
}
