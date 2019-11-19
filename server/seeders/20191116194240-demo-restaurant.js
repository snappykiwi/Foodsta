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
     streetAddr: '120 fake address',
     city: 'Rochester',
     state: 'NH',
     country: 'USA',
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
    name: 'Wing-Itz',
    streetAddr: '121 fake address',
    city: 'Rochester',
    state: 'NH',
    country: 'USA',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Flight Coffee',
    streetAddr: '122 fake address',
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
