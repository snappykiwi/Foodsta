require('dotenv').config();

const
    multer = require('multer'),
    upload = multer(),
    routes = require('express').Router(),
    dbController = require("../controllers/dbController"),
    googleApiController = require("../controllers/googleApiController"),
    awsController = require("../controllers/awsController"),
    auth0Controller = require("../controllers/auth0Controller");

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

//Getting all the post by restaurantId, gluttenFree, vegan, vegetarian, title, cuisine, restaurantName
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
    .post(googleApiController.geolocation);

/* AWS 
--------------------------- */

// Upload picture to AWS Bucket
routes
    .route("/picUpload")
    .post(upload.single('picture'), awsController.picUpload);

/* Auth0 API 
--------------------------- */

//get Auth0 User information
routes
    .route("/auth0/user/:userId")
    .get(auth0Controller.getUserInfo);

// Update Auth0 User information
routes
    .route("/auth0/update/:userId")
    .patch(auth0Controller.updateUserInfo);

module.exports = routes
