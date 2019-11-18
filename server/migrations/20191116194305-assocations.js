'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn(
      'Posts',
      'UserId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    ).then(() => {
      return queryInterface.addColumn(
        'Posts',
        'MealId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Meals',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    }).then(() => {
      // post hasOne Restaurant
      return queryInterface.addColumn(
        'Posts',
        'RestaurantId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Restaurants',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn(
      'Posts',
      'UserId'
    )
      .then(() => {
        return queryInterface.removeColumn(
          'Posts',
          'RestaurantId',
        ).then(() => {
          return queryInterface.removeColumn(
            'Posts',
            'MealId'
          )
        });
      });
  }
};
