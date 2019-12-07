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
    return queryInterface.bulkInsert('Posts', [{
      userId: "eliasisaiah@outlook.com",
      userName: "Elias Roussos",
      title: 'TITLE test title',
      caption: 'caption test caption',
      cuisine: 'chinese',
      image: 'http://placekitten.com/g/200/300',
      rating: '7',
      gf: 'false',
      vegan: 'false',
      vegetarian: 'true',
      RestaurantId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: "eliasisaiah@outlook.com",
      userName: "Elias Roussos",
      title: 'TITLE2 test title',
      caption: 'caption2 test caption',
      cuisine: 'latvian',
      image: 'http://placekitten.com/g/200/300',
      rating: '7',
      gf: 'false',
      vegan: 'false',
      vegetarian: 'true',
      RestaurantId: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: "eliasisaiah@outlook.com",
      userName: "Elias Roussos",
      title: 'TITLE3 test title',
      caption: 'caption3 test caption',
      cuisine: 'greek',
      image: 'http://placekitten.com/g/200/300',
      rating: '7',
      gf: 'false',
      vegan: 'false',
      vegetarian: 'true',
      RestaurantId: '3',
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

    return queryInterface.bulkDelete('Posts', null, {});
  }
};
