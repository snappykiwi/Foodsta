require('dotenv').config();
const multer = require('multer');
const upload = multer();

const
    routes = require('express').Router(),
    db = require('../models'),
    axios = require('axios');
awsPhotoUpload = require("../awsPhotoUpload");

routes.post('/posts/add', (req, res) => {
    const post = req.body;
    console.log(post);
    db.Post.create({

        "title": post.title,
        "body": post.caption,
        "tags": post.tags,
        "image": post.image,
        "rating": post.rating,
        "gf": post.gf,
        "vegan": post.vegan,
        "vegetarian": post.vegetarian,
        "MealId": post.MealId,
        "UserId": post.UserId,
        "RestaurantId": post.RestaurantId
    }).then((response) => {

        res.json(response);
    }).catch(err => {
        console.log(err);
        throw err;
    })
});

routes.put('/posts/:id', (req, res) => {
    const post = req.body;
    db.Post.update({
        "title": post.title,
        "body": post.caption,
        "tags": post.tags,
        "image": post.image,
        "rating": post.rating,
        "gf": post.gf,
        "vegan": post.vegan,
        "vegetarian": post.vegetarian,
        "MealId": post.MealId,
        "RestaurantId": post.RestaurantId
    }, {
        where: {
            id: req.params.id
        }
    }).then(db.Post.findByPk(req.params.id))
        .then((updatedPost) => {
            res.json(updatedPost);
        })
})

routes.get('/posts/:id?', (req, res) => {
    if (req.params.id) {

        db.Post
            .findAll({
                where: {
                    id: req.params.id
                },
                include: [db.User, db.Restaurant, db.Meal]
            })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    } else {
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
    }
})

routes.delete('/posts/:id', (req, res) => {
    db.Post
        .findOne({
            where: {
                id: req.params.id
            }
        })
        .then((foundPost) => {
            if (!foundPost) {
                res.status(500).send("Could not find the requested post");
                return
            } else foundPost.destroy()
        })
        .then((response) => {
            res.send(response);
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
})

routes.get('/posts/meal/:MealId', (req, res) => {
    const { MealId } = req.params;

    db.Post
        .findAll({
            where: {
                MealId: MealId
            },
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

routes.get('/posts/restaurant/:RestaurantId', (req, res) => {
    const { RestaurantId } = req.params;

    db.Post
        .findAll({
            where: {
                RestaurantId: RestaurantId
            },
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

routes.get('/restaurants', (req, res) => {
    db.Restaurant
        .findAll({})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
})

routes.get('/test', (req, res) => {
    res.json({ status: 200 });
})

/* GOOGLE SEARCH */

routes.get('/google/place/:searchInput?/:radius?', (req, res) => {

    const
        googleApiKey = process.env.GOOGLE_API_KEY,
        searchInput = req.query.searchInput || "restaurant",
        radius = req.query.radius || 20;

    // why is it req.query and not req.params???????????????????
    // console.log(searchInput);
    // console.log(req.query.searchInput);

    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchInput}&radius=${radius}&key=${googleApiKey}`)
        .then((response) => {

            const datas = response.data.results;

            return Promise.resolve(datas);

        }).then((results) => {
            return Promise.all(results.map((el) => {
                return axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${el.place_id}&key=${googleApiKey}`)
                    .catch(err => err)
            }))
        }).then((resData) => {
            const resDetails = resData.map((restaurant) => {
                const restData = restaurant.data.result;
                return {
                    name: restData.name !== undefined ? restData.name : "N/A",
                    address: restData.formatted_address !== undefined ? restData.formatted_address : "N/A",
                    phoneNumber: restData.formatted_phone_number !== undefined ? restData.formatted_phone_number : "N/A",
                    openingHour: restData.opening_hours.weekday_text !== undefined ? restData.opening_hours.weekday_text : "N/A",
                    priceLevel: restData.price_level !== undefined ? restData.price_level : "N/A",
                    websiteUrl: restData.website !== undefined ? restData.website : "N/A"
                }
            })
            res.json(resDetails);
        }).catch(err => console.log(err))
});

routes.post("/picUpload", upload.single('picture'), (req, res) => {

    console.log(req.file);

    if (!req.file || Object.keys(req.file).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    awsPhotoUpload(req, res);
});


module.exports = routes
