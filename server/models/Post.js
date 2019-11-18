'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    tags: DataTypes.STRING,
    image: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    gf: DataTypes.BOOLEAN,
    vegan: DataTypes.BOOLEAN,
    vegetarian: DataTypes.BOOLEAN
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User);
    Post.belongsTo(models.Restaurant);
    Post.belongsTo(models.Meal);
  };
  return Post;
};