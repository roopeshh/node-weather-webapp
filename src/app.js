const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs');
app.set('views', viewsDirectory);
hbs.registerPartials(partialsDirectory);

app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Home Page',
        name: 'Roopesh'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Roopesh'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'Please get to this page to get the help',
        name: 'Roopesh'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a location to get the weather'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                });
            }
            res.send({
                location,
                forecast: forecastData
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        message: 'Help article not found',
        name: 'Roopesh'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Roopesh'
    });
});

app.listen(port, () => {
    console.log('Server started at port:', port);
});