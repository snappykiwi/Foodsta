const routes = require('express').Router();
const db = require('../models');

routes.get('/posts/:id?', (req, res) => {
    db.Post
        .findAll({
            include: [db.User, db.Restaurant, db.Meal]
        })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
})


routes.get('/meal/id?', (req, res) => {
})

module.exports = routes
