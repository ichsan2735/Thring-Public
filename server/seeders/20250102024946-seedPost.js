'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require("../data/posts.json").map(el => {
      el.createdAt = el.updatedAt = new Date()
      return el
    })

    await queryInterface.bulkInsert("Posts", data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Posts", null)
  }
};
