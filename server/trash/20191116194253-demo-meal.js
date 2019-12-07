'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Meals', [{
      name: 'A Thanksgiving dinner',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Andouille',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Bologna sausage',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Breakfast sausage',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Butter With Bread',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Calas',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Charleston red rice',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Chaudin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Chicken bog',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Dirty rice',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Githeri',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Glorified rice',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Goetta',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Gumbo',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Half-smoke',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Hawaiian haystack',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Hoppin John',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Hot dog',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Italian hot dog',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Jambalaya',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Kielbasa',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Lebanon bologna',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Maxwell Street Polish',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Polish Boy',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Rice and gravy',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Sandwich bread',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Shrimp Creole',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Spanish rice',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Vienna sausage',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Yeung Chow fried rice',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Meals', null, {});
  }
};
