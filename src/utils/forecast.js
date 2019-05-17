const request = require('request');

//Weather forecast -- take coordinates and forecast weather

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/6cc848920e40430b2e16c067d6228c24/'+latitude+','+longitude+'?units=si';

    console.log('URL : ', url)

    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Sorry, could not connect to weather service! Please check your connection and try again later.', undefined)
        }else if(body.error){
            callback(body.error, undefined);
        }else{
            const forecast = {
                hourly: body.hourly.summary,
                daily: body.daily.summary,
                forecastData: 'Currently it is '+ body.currently.temperature+ ' degrees out there. Chance of precipitation today is '+ body.currently.precipProbability+ '%.'
            }
            callback(undefined, forecast);
        }
    })
}

module.exports = forecast;