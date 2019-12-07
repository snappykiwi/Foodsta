'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userId: DataTypes.STRING,
    userName: DataTypes.STRING,
    title: DataTypes.STRING,
    caption: DataTypes.TEXT,
    cuisine: DataTypes.STRING,
    image: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    gf: DataTypes.BOOLEAN,
    vegan: DataTypes.BOOLEAN,
    vegetarian: DataTypes.BOOLEAN,
    restaurantId: DataTypes.STRING,
    restaurantName: DataTypes.STRING
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};