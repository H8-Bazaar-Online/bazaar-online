'use strict';
const { hashPass } = require('../helpers/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
     await queryInterface.bulkInsert('Users', [
       {
         username: 'user1',
         email: 'merchant@mail.com',
         password: hashPass('merchant123'),
         role: 'merchant',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
        username: 'customer1',
        email: 'customer1@mail.com',
        password: hashPass('cust123'),
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
