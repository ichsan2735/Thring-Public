'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        username: "user1",
        email: "user1@gmail.com",
        password: hashPassword("user1"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "user2",
        email: "user2@gmail.com",
        password: hashPassword("user2"),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "user3",
        email: "user3@gmail.com",
        password: hashPassword("user3"),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null)
  }
};
