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
    res.json({status: 200});
})

/* GOOGLE SEARCH */

routes.get('/google/place/:searchInput', (req, res) => {

    const
        googleApiKey = process.env.GOOGLE_API_KEY,
        searchInput = req.params.searchInput || "restaurant",
        radius = 3,
        dataResult = [];

    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchInput}&radius=${radius}&key=${googleApiKey}`).then((response) => {

        const datas = response.data.results;

        datas.map((elem) => {

            const placeId = elem.place_id;

            axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${googleApiKey}`).then((placedetail) => {

                const placeDetailsDatas = placedetail.data.result;

                let dataArr = []

                dataArr.push(placeDetailsDatas);

                dataArr.map((place) => {

                    let placeObjt = {
                        name: place.name,
                        address: place.formatted_address,
                        phoneNumber: place.formatted_phone_number,
                        openingHour: place.opening_hours.weekday_text,
                        priceLevel: place.price_level,
                        websiteUrl: place.website

                    };

                    dataResult.push(placeObjt);

                    console.log(dataResult);
                })
            })
        });

    });

    res.send(dataResult);
});

routes.post("/profilePicUpload", upload.single('picture'), (req, res) => {
    console.log(req.file);
    if (!req.file || Object.keys(req.file).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
  
    awsPhotoUpload(req, res);
  });


module.exports = routes
