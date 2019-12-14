require('dotenv').config();

const
    multer = require('multer'),
    upload = multer(),
    routes = require('express').Router(),
    axios = require('axios').default,
    awsPhotoUpload = require("../awsPhotoUpload"),
    getTokenAuth0 = require('../controllers/getTokenAuth0'),
    placesController = require('../controllers/placesController'),
    dbController = require("../controllers/dbController"),
    uuid = require('uuid/v4');


// Get All post or One by Id
routes
    .route('/posts/:id?')
    .get(dbController.findOnePostByIdOrAll);

// Create Posts
routes
    .route('/posts')
    .post(dbController.createPost);

// Delete Posts
routes
    .route('/posts/:id')
    .delete(dbController.deletePost);

// Find a User Posts
routes
    .route('/posts/user/:id')
    .get(dbController.findUserPost);

// Find a Restaurant Posts
routes
    .route('/posts/restaurant/:restaurantId')
    .get(dbController.findRestaurantPost);

// Partial Post search 
routes
    .route('/posts/partial/:searchString')
    .get(dbController.partialSearchPost);

//Getting all the post by restaurantId, gluttenFree, vegan, vegetarian
routes
    .route('/posts/searchby/v2/')
    .get(dbController.getPostBy);

/* GOOGLE SEARCH */

routes.get("/google/place/v2/", (req, res) => {

    const
        googleApiKey = process.env.GOOGLE_API_KEY,
        searchInput = req.query.searchInput || "restaurant",
        lat = req.query.lat,
        lng = req.query.lng,
        radius = req.query.radius || 1500;

    placesController
        .getNearByRestaurants(searchInput, lat, lng, radius, googleApiKey)
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


routes.post("/google/place/user/geolocation", (req, res) => {

    const googleApiKey = process.env.GOOGLE_API_KEY;

    placesController
        .geolocation(googleApiKey)
        .then((results) => res.status(200).json(results))
        .catch((error) => res.status(error.statusCode).json(error))

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
