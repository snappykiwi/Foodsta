const
    axios = require('axios'),
    rp = require('request-promise');

const placesController = {

    getNearByRestaurants: function (searchInput, lat, lng, radius, googleApiKey) {

        return axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${searchInput}&location=${lat},${lng}&radius=${radius}&types=restaurant&key=${googleApiKey}`)
            .then((response) => Promise.resolve(response.data.results))
            .catch((error) => Promise.reject(error))
    },
    getDetailsRestaurant: function (place_id, googleApiKey) {

        return axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${googleApiKey}`)
            .then((response) => {

                const restData = response.data.result;

                return Promise.resolve({
                    name: restData.name !== undefined ? restData.name : "N/A",
                    address: restData.formatted_address !== undefined ? restData.formatted_address : "N/A",
                    phoneNumber: restData.formatted_phone_number !== undefined ? restData.formatted_phone_number : "N/A",
                    openingHour: restData.opening_hours.weekday_text !== undefined ? restData.opening_hours.weekday_text : "N/A",
                    priceLevel: restData.price_level !== undefined ? restData.price_level : 0,
                    websiteUrl: restData.website !== undefined ? restData.website : "N/A",
                    openNow: restData.opening_hours.open_now !== undefined ? restData.opening_hours.open_now : null,
                    mapUrl: restData.url !== undefined ? restData.url : "",
                });
            });
    },
    autoComplete: function (searchInput, radius, googleApiKey, sessionToken) {
        console.log(sessionToken);
        return axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${googleApiKey}&input=${searchInput}&types=establishment&sessiontoken=${sessionToken}`)
            .then((response) => {
                const filteredRestaurants = response.data.predictions.filter((restaurant) => (restaurant.types.includes('restaurant')));

                return Promise.resolve(filteredRestaurants)
            })
            .catch((error) => Promise.reject(error));
    },
    geolocation: async function (googleApiKey) {

        const options = {
            method: 'POST',
            url: `https://www.googleapis.com/geolocation/v1/geolocate?key=${googleApiKey}`,
            json: true
        };

        let userGeolocation = "";

        try {
            userGeolocation = await rp(options)
        }
        catch (error) {
            console.log(error);
        }
        return userGeolocation;

    }
}

module.exports = placesController;