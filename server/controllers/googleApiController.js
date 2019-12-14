const
    placesController = require('../controllers/placesController'),
    uuid = require('uuid/v4');

const googleApiController = {

    getNearByRestaurant: function (req, res) {

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

    },
    getRestaurantDetails: function (req, res) {

        const
            { id } = req.params,
            googleApiKey = process.env.GOOGLE_API_KEY;

        placesController
            .getDetailsRestaurant(id, googleApiKey)
            .then((restaurantDetails) => res.status(200).json(restaurantDetails))
            .catch((error) => res.sendStatus(404))

    },
    autoComplete: function (req, res) {

        const
            { searchInput } = req.params,
            googleApiKey = process.env.GOOGLE_API_KEY,
            radius = req.params.radius || 1500,
            sessionToken = uuid();

        console.log(searchInput)

        placesController
            .autoComplete(searchInput, radius, googleApiKey, sessionToken)
            .then((results) => res.status(200).json(results))
            .catch((error) => res.status(error.statusCode).json(error))
    },
    geolocation: function (req, res) {

        const googleApiKey = process.env.GOOGLE_API_KEY;

        placesController
            .geolocation(googleApiKey)
            .then((results) => res.status(200).json(results))
            .catch((error) => res.status(error.statusCode).json(error))
    }

};

module.exports = googleApiController;