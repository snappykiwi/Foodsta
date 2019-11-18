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
   return queryInterface.bulkInsert('Restaurants',[{
     name: 'Dominos Pizza',
     streetAddr: '12 Glenwood Ave',
     city: 'Rochester',
     state: 'NH',
     country: 'USA',
     createdAt: new Date(),
     updatedAt: new Date()
   }])
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Restaurants', null, {});
  }
};
