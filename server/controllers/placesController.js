const axios = require('axios');

const placesController = {

    getNearByRestaurants: function (searchInput, radius, googleApiKey) {

        return axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchInput}&radius=${radius}&key=${googleApiKey}`)
            .then((response) => Promise.resolve(response.data.results))
            .catch((error) => Promise.reject(error))
    },
    getDetailsRestaurant: function (place_id, googleApiKey) {

        return axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${googleApiKey}`)
            .then((response) => {
                const restData = restaurant.data.result;
                const weekday = restData.opening_hours;

                return Promise.resolve({
                    //name: restData.name !== undefined ? restData.name : "N/A",
                    //address: restData.formatted_address !== undefined ? restData.formatted_address : "N/A",
                    phoneNumber: restData.formatted_phone_number !== undefined ? restData.formatted_phone_number : "N/A",
                    openingHour: restData.opening_hours.weekday_text !== undefined ? restData.opening_hours.weekday_text : "N/A",
                    //priceLevel: restData.price_level !== undefined ? restData.price_level : 0,
                    websiteUrl: restData.website !== undefined ? restData.website : "N/A",
                    // id: restData.place_id,
                    // openNow: restData.opening_hours.open_now !== undefined ? restData.opening_hours.open_now : null,
                    //types: restData.types !== undefined ? restData.types : [],
                    mapUrl: restData.url !== undefined ? restData.url : "",
                    //latitude: restData.geometry !== undefined ? restData.geometry.location.lat : "",
                    //longitude: restData.geometry !== undefined ? restData.geometry.location.lng : ""
                });
            });
    }
}


module.exports = placesController;