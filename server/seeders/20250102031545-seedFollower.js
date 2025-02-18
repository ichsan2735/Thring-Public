'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Followers", [
      {
        FollowersId: 1,
        FollowingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        FollowersId: 1,
        FollowingId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        FollowersId: 2,
        FollowingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        FollowersId: 3,
        FollowingId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        FollowersId: 3,
        FollowingId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Followers", null)
  }
};
