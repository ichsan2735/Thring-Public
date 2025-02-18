'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Profiles", [
      {
        avatarUrl: "https://res.cloudinary.com/dwpjjefa0/image/upload/v1735784854/pngwing.com_e1itsi.png",
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatarUrl: "https://res.cloudinary.com/dwpjjefa0/image/upload/v1735784854/pngwing.com_e1itsi.png",
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        avatarUrl: "https://res.cloudinary.com/dwpjjefa0/image/upload/v1735784854/pngwing.com_e1itsi.png",
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        UserId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Profiles", null)
  }
};
