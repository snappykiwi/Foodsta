require('dotenv').config();

const
    multer = require('multer'),
    upload = multer(),
    routes = require('express').Router(),
    Sequelize = require('sequelize'),
    db = require('../models'),
    axios = require('axios').default,
<<<<<<< HEAD
=======
    //request = require('request'),
>>>>>>> 483bd4794d0ffdf43d9574109b80373ce42ebfb6
    Op = Sequelize.Op,
    awsPhotoUpload = require("../awsPhotoUpload"),
    rp = require('request-promise'),
    getTokenAuth0 = require('../functions/getTokenAuth0');

routes.get('/meals', (req, res) => {
    db.Meal
        .findAll({})
        .then((response) => {

            res.json(response);
        })
        .catch((err) => {
            console.log(err);
            throw err;
        })
})

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
        "restaurantId": post.restaurantId,
        "restaurantName": post.restaurantName.name,
        "MealId": post.MealId,
        "UserId": post.UserId
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
                include: [db.Meal]
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
                include: [db.Meal]
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

routes.get('/posts/partial/:searchString', (req, res) => {
    console.log(req.params.searchString);
    let searchString = req.params.searchString.toLowerCase().trim();
    db.Post
        .findAll({
            include: [db.Meal],
            where: {

                [Op.or]: [
                    {
                        title: {
                            [Op.like]: `%${searchString}%`
                        }
                    }, {
                        '$Meal.name$': {
                            [Op.like]: `%${searchString}%`
                        }
                    }, {
                        restaurantName: {
                            [Op.like]: `%${searchString}%`
                        }
                    }
                ]
            }
        })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
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

//Getting all the post by userId, restaurantId, gluttenFree, vegan, vegetarian
routes.get('/posts/searchby/userid/:userId?/restaurant/:restaurantId?/gf/:gf?/vegan/:vegan?/vegetarian/:vegetarian?', (req, res) => {

    const
        searchby = req.params,
        parameters = Object.keys(searchby);

    let paramatersArray = [];

    parameters.forEach((param) => {

        if (searchby[param] !== undefined) paramatersArray.push(
            {
                [param]: searchby[param]
            }
        )
    })

    db.Post
        .findAll({
            where: {
                [Op.or]: paramatersArray
            }
        })
        .then(data => {
            res.json(data);
            console.log("data", data);
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
})

routes.get('/posts/meal/:MealId', (req, res) => {
    const { MealId } = req.params;

    db.Post
        .findAll({
            where: {
                MealId: MealId
            },
            include: [db.Meal]
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
    console.log(RestaurantId);

    db.Post
        .findAll({
            where: {
                restaurantId: RestaurantId
            },
            include: [db.Meal]
        })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
})

// routes.get('/restaurants', (req, res) => {
//     db.Restaurant
//         .findAll({})
//         .then(data => {
//             res.json(data);
//         })
//         .catch(err => {
//             console.log(err);
//             throw err;
//         })
// })

/* GOOGLE SEARCH */

routes.get('/google/place/:searchInput?/:radius?', (req, res) => {

    const
        googleApiKey = process.env.GOOGLE_API_KEY,
        searchInput = req.query.searchInput || "restaurant",
        radius = req.query.radius || 20;

    // why is it req.query and not req.params???????????????????
    // console.log(searchInput);
    // console.log(req.query.searchInput);

    // when page first load 
    /* 
    - check session storage for an existing array of nearby restaurant
    - if have something in the session we pull from it otherwise we make a api call
    - when listing the restaurant we only display the minimum information that comes with the first call
    - if a user click on a specific restaurant save that call in an object store placeid as a key name in the restauranDetailsObject 
    in the session storage
    - In developement we can save them into localstorage (If NODE_ENV=="production" then save the results into session storage otherwise
    save in localstorage )

    */
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
                const weekday = restData.opening_hours;
                // console.log(restData.url);
                if (typeof weekday !== 'undefined') {

                    return {
                        name: restData.name !== undefined ? restData.name : "N/A",
                        address: restData.formatted_address !== undefined ? restData.formatted_address : "N/A",
                        phoneNumber: restData.formatted_phone_number !== undefined ? restData.formatted_phone_number : "N/A",
                        openingHour: restData.opening_hours.weekday_text !== undefined ? restData.opening_hours.weekday_text : "N/A",
                        priceLevel: restData.price_level !== undefined ? restData.price_level : 0,
                        websiteUrl: restData.website !== undefined ? restData.website : "N/A",
                        id: restData.place_id,
                        openNow: restData.opening_hours.open_now !== undefined ? restData.opening_hours.open_now : null,
                        types: restData.types !== undefined ? restData.types : [],
                        mapUrl: restData.url !== undefined ? restData.url : "",
                        latitude: restData.geometry !== undefined ? restData.geometry.location.lat : "",
                        longitude: restData.geometry !== undefined ? restData.geometry.location.lng : ""
                    }

                }
            })
            // console.log(resDetails.mapUrl);
            const filteredRestaurants = resDetails.filter((restaurant) => {
                return (restaurant !== undefined) && restaurant.types.includes('restaurant')
            });
            // console.log(filteredRestaurants);
            res.json(filteredRestaurants);
        }).catch(err => console.log(err))
});

routes.post("/picUpload", upload.single('picture'), (req, res) => {

    console.log(req.file);

    if (!req.file || Object.keys(req.file).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    awsPhotoUpload(req, res);
});


/* Auth0 API 
---------------- */

//get Auth0 User information
routes.get("/auth0/user/:userId", (req, res) => {

    getTokenAuth0().then((tokenDataResponse) => {

        const
            { access_token, token_type } = tokenDataResponse,
            { userId } = req.params,
            options = {
                url: `${process.env.AUDIENCE_USERS_AUTH0}${userId}`,
                headers: {
                    authorization: `${token_type} ${access_token}`
                }
            };

        axios(options)
            .then((response) => Promise.resolve(response.data))
            .then((results) => res.json(results))
            .catch((err) => console.log(err));
    });
});

// Update Auth0 User information
routes.patch("/auth0/update/:userId", (req, res) => {

    getTokenAuth0().then((tokenDataResponse) => {

        const
            { access_token, token_type } = tokenDataResponse,
            { userId } = req.params,
            datas = JSON.stringify(req.body),
            options = {
                method: 'PATCH',
                url: `${process.env.AUDIENCE_USERS_AUTH0}${userId}`,
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${token_type} ${access_token}`
                },
                data: datas
            };

        axios(options)
            .then((results) => res.json("ok:200"))
            .catch((err) => console.log(err));

    });
});

module.exports = routes
