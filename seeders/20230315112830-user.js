'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const salt = bcrypt.genSaltSync(10);
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Administrator',
        username: 'admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('admin@123', salt),
        isAdmin: true,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Users', null, {
      truncate: true,
      cascade: true,
    });
  },
};
