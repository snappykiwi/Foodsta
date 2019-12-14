require('dotenv').config();

const
    multer = require('multer'),
    upload = multer(),
    routes = require('express').Router(),
    axios = require('axios').default,
    awsPhotoUpload = require("../awsPhotoUpload"),
    getTokenAuth0 = require('../controllers/getTokenAuth0'),
    dbController = require("../controllers/dbController"),
    googleApiController = require("../controllers/googleApiController");

/* Database - Sequelize 
--------------------------- */

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

/* GOOGLE PLACE API SEARCH 
--------------------------- */

// Get Nearby Restaurant based on your current location
routes
    .route("/google/place/v2/")
    .get(googleApiController.getNearByRestaurant);

// Get more details on a specific restaurant
routes
    .route("/google/place/restaurantdetails/:id")
    .get(googleApiController.getRestaurantDetails);

// AutoComplete result from what the user is typing
routes
    .route("/google/place/autocomplete/:searchInput/:radius?")
    .get(googleApiController.autoComplete);

// Get User location by using Geolocation API
routes
    .route("/google/place/user/geolocation")
    .get(googleApiController.geolocation);

/* AWS 
--------------------------- */

routes.post("/picUpload", upload.single('picture'), (req, res) => {

    console.log(req.file);

    if (!req.file || Object.keys(req.file).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    awsPhotoUpload(req, res);
});


/* Auth0 API 
--------------------------- */

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
