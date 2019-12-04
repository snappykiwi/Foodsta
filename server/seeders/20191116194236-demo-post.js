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
      title: 'TITLE test title',
      body: 'BODY test body',
      tags: '["TAG", "TagTwo"]',
      image: 'http://placekitten.com/g/200/300',
      rating: '7',
      gf: 'false',
      vegan: 'false',
      vegetarian: 'true',
      MealId: '1',
      RestaurantId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: "eliasisaiah@outlook.com",
      title: 'TITLE2 test title',
      body: 'BODY2 test body',
      tags: '["TAG", "TagTwo"]',
      image: 'http://placekitten.com/g/200/300',
      rating: '7',
      gf: 'false',
      vegan: 'false',
      vegetarian: 'true',
      MealId: '2',
      RestaurantId: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: "eliasisaiah@outlook.com",
      title: 'TITLE3 test title',
      body: 'BODY3 test body',
      tags: '["TAG", "TagTwo"]',
      image: 'http://placekitten.com/g/200/300',
      rating: '7',
      gf: 'false',
      vegan: 'false',
      vegetarian: 'true',
      MealId: '3',
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
