require('dotenv').config();

const
    multer = require('multer'),
    upload = multer(),
    routes = require('express').Router(),
    Sequelize = require('sequelize'),
    db = require('../models'),
    axios = require('axios').default,
    Op = Sequelize.Op,
    awsPhotoUpload = require("../awsPhotoUpload"),
    getTokenAuth0 = require('../controllers/getTokenAuth0'),
    placesController = require('../controllers/placesController'),
    apiHelpers = require('../controllers/apiHelpers'),
    uuid = require('uuid/v4');



routes.get('/posts/:id?', (req, res) => {
    if (req.params.id) {

        db.Post
            .findOne({
                where: {
                    id: req.params.id
                }
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
                order: [['createdAt', 'DESC']]
            })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    };
});


routes.post('/posts', (req, res) => {
    const post = req.body;
    console.log(post);
    db.Post.create({
        "userId": post.userId,
        "userName": post.userName,
        "title": post.title,
        "caption": post.caption,
        "cuisine": post.cuisine,
        "image": post.image,
        "rating": post.rating,
        "gf": post.gf,
        "vegan": post.vegan,
        "vegetarian": post.vegetarian,
        "restaurantId": post.restaurantId,
        "restaurantName": post.restaurantName
    }).then((response) => {

        res.json(response);
    }).catch(err => {
        GET
        console.log(err);
        throw err;
    });
});

routes.put('/posts/:id', (req, res) => {
    const post = req.body;
    db.Post.update({
        "title": post.title,
        "caption": post.caption,
        "cuisine": post.cuisine,
        "image": post.image,
        "rating": post.rating,
        "gf": post.gf,
        "vegan": post.vegan,
        "vegetarian": post.vegetarian,
        "RestaurantId": post.RestaurantId
    }, {
        where: {
            id: req.params.id
        }
        // }).then(db.Post.findByPk(req.params.id))
        //     .then((updatedPost) => {
        //         res.json(updatedPost);
        //     })
    }).then((response) => res.json(response))
        .catch(err => {
            console.log(err);
            throw err;
        });
});


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
            res.status(200).send("post deleted");
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
});


routes.get('/posts/user/:id', (req, res) => {
    db.Post
        .findAll({
            where: {
                userId: req.params.id
            },
            order: [['createdAt', 'DESC']]
        })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
});


routes.get('/posts/restaurant/:RestaurantId', (req, res) => {

    const
        { RestaurantId } = req.params,
        queryParameters = Object.keys(req.query),
        queryParam = queryParameters[0],
        queryValue = req.query[queryParameters],
        orderBy = apiHelpers.sequelizeOrderBy(queryParam, queryValue);

    let sortParametersArray = [];

    (orderBy) && sortParametersArray.push(orderBy)

    db.Post
        .findAll({
            where: {
                restaurantId: RestaurantId
            },
            order: sortParametersArray.length ? sortParametersArray : [['createdAt', 'DESC']]
        })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
});

routes.get('/posts/partial/:searchString', (req, res) => {

    let sortParametersArray = [];
    const
        searchString = req.params.searchString.toLowerCase().trim(),
        queryParameters = Object.keys(req.query);

    queryParameters.forEach((param) => {

        const orderBy = apiHelpers.sequelizeOrderBy(param, req.query[param]);

        (orderBy) && sortParametersArray.push(orderBy)
    })

    db.Post
        .findAll({
            where: {

                [Op.or]: [
                    {
                        title: {
                            [Op.like]: `%${searchString}%`
                        }
                    }, {
                        cuisine: {
                            [Op.like]: `%${searchString}%`
                        }
                    }, {
                        restaurantName: {
                            [Op.like]: `%${searchString}%`
                        }
                    }
                ]
            },
            order: sortParametersArray.length ? sortParametersArray : [['createdAt', 'DESC']]
        })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
});


//Getting all the post by restaurantId, gluttenFree, vegan, vegetarian
routes.get('/posts/searchby/v2/', (req, res) => {

    const queryParameters = Object.keys(req.query);
    let paramatersArray = [];
    let sortParametersArray = [];

    queryParameters.forEach((param) => {

        switch (param) {
            case 'restaurantId':
            case 'gf':
            case 'vegan':
            case 'vegetarian':
                if (req.query[param] !== undefined) paramatersArray.push(
                    {
                        [param]: req.query[param]
                    }
                )
                return
        }

        const orderBy = apiHelpers.sequelizeOrderBy(param, req.query[param]);

        (orderBy) && sortParametersArray.push(orderBy)
    })

    db.Post
        .findAll({
            where: {
                [Op.or]: paramatersArray
            },
            order: sortParametersArray.length ? sortParametersArray : [['createdAt', 'DESC']]
        })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            throw err;
        });
});


/* GOOGLE SEARCH */

routes.get("/google/place/v2/:searchInput?/:radius?", (req, res) => {

    const
        googleApiKey = process.env.GOOGLE_API_KEY,
        searchInput = req.query.searchInput || "restaurant",
        radius = req.query.radius || 20;
    console.log("called restaurant api call");
    placesController
        .getNearByRestaurants(searchInput, radius, googleApiKey)
        .then((restaurantsNearby) => res.status(200).json(restaurantsNearby))
        .catch((error) => res.sendStatus(500))
});

routes.get("/google/place/restaurantdetails/:id", (req, res) => {

    const
        { id } = req.params,
        googleApiKey = process.env.GOOGLE_API_KEY;

    placesController
        .getDetailsRestaurant(id, googleApiKey)
        .then((restaurantDetails) => res.status(200).json(restaurantDetails))
        .catch((error) => res.sendStatus(404))

});

routes.post("/picUpload", upload.single('picture'), (req, res) => {

    console.log(req.file);

    if (!req.file || Object.keys(req.file).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    awsPhotoUpload(req, res);
});

routes.get("/google/place/autocomplete/:searchInput/:radius?", (req, res) => {

    const
        { searchInput } = req.params,
        googleApiKey = process.env.GOOGLE_API_KEY,
        radius = req.params.radius || 100,
        sessionToken = uuid();

    console.log(searchInput)

    placesController
        .autoComplete(searchInput, radius, googleApiKey, sessionToken)
        .then((results) => res.status(200).json(results))
        .catch((error) => res.status(error.statusCode).json(error))
});


routes.post("/google/user/geolocation", (req, res) => {

    const
        googleApiKey = process.env.GOOGLE_API_KEY,
        options = {
            method: 'POST',
            url: `https://www.googleapis.com/geolocation/v1/geolocate?key=${googleApiKey}`
        };

    console.log(options.url);

    axios(options)
        .then((response) => {
            console.log("Reponse!!!", response);
            res.send(response.data)
        })
        .catch((err) => console.log(err));

    // placesController
    //     .geolocation(googleApiKey)
    //     .then((results) => {
    //         console.log(`Location: ${JSON.stringify(results)}`);
    //         res.status(200).json(results);
    //     })
    //     .catch((error) => res.status(error.statusCode).json(error))

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
            .then((response) => res.send(response.data))
            .catch((err) => console.log(err));
    });
});

// Update Auth0 User information
routes.patch("/auth0/update/:userId", (req, res) => {

    console.log("******************************************")

    console.log(`REQ : ${JSON.stringify(req.body)}`);

    res.json(req.body);

    getTokenAuth0().then((tokenDataResponse) => {

        const
            { access_token, token_type } = tokenDataResponse,
            { userId } = req.params,
            user_data = req.body,
            options = {
                method: 'PATCH',
                url: `${process.env.AUDIENCE_USERS_AUTH0}${userId}`,
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${token_type} ${access_token}`
                },

                data: datas = user_data
            };

        console.log(`************************************** ${options.url}`);

        axios(options)
            .catch((err) => console.log(err));
    });

});

module.exports = routes
