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
     name: 'Emily Coraccio',
     email: 'ecoraccio@mailinator.com',
     profilePic: 'http://placekitten.com/200/300',
     preferences: '{"darkMode":"true"}',
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
    name: 'Elias Roussos',
    email: 'eroussos@mailinator.com',
    profilePic: 'http://placekitten.com/200/300',
    preferences: '{"darkMode":"true"}',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Yunus Ibraham',
    email: 'yibraham@mailinator.com',
    profilePic: 'http://placekitten.com/200/300',
    preferences: '{"darkMode":"true"}',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Michael Nos',
    email: 'mnos@mailinator.com',
    profilePic: 'http://placekitten.com/200/300',
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
