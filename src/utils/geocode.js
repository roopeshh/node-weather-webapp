const request = require('request');

//Geocoding -- take a city name and return lat and long

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoicm9vcGVzaGgiLCJhIjoiY2p2bnNpMDI4MW04cDQ5bDIxbjR0bDczbyJ9.0IHsyqClWvJai-iJndeMPg';

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Sorry, could not connect to Geocoding service! Please check your connection and try again later.', undefined)
        }else if(body.message) {
            callback(body.message, undefined);
        }else if(body.features.length === 0) {
            callback('Invalid location! Please enter a valid location', undefined);
        }else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;