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
   return queryInterface.bulkInsert('Users',[{
     name: 'John Smith',
     email: 'jsmith@mailinator.com',
     profilePic: 'https://i5.walmartimages.com/asr/178554d0-a564-4413-85dd-0472e0d08b8e_1.c681da5fb244ec3b6fb9963a22b87612.jpeg',
     preferences: '{"darkMode":"true"}',
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
    return queryInterface.bulkDelete('Users', null, {});
  }
};
