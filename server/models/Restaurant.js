'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: DataTypes.STRING,
    streetAddr: DataTypes.STRING,
    lat: DataTypes.FLOAT(10,6),
    long: DataTypes.FLOAT(10,6)
    // city: DataTypes.STRING,
    // state: DataTypes.STRING,
    // country: DataTypes.STRING
  }, {});
  Restaurant.associate = function(models) {
    // associations can be defined here
    Restaurant.hasMany(models.Post);
  };
  return Restaurant;
};