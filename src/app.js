const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set static dir to serve
app.use(express.static(publicDirPath))

//set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (reg, res) => {
    res.render('index', {
         title: 'Weather app',
         name: 'Jånny Långbottom'
    })
})

app.get('/about', (reg, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jånny Långbottom'
    })
})

app.get('/help', (reg, res) => {
    res.render('help', {
        title: 'Help',
        string: 'Some really helpful text.',
        name: 'Jånny Långbottom'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a search address'
        })
    }
    geocode(req.query.address, (thiserror, {latitude, longitude, location} = {}) => {
        if(thiserror){
            return res.send({
                error: thiserror
            })
        }
    
        forecast(latitude, longitude, (thaterror, forecastData) => {
            if(thaterror){
                return res.send({
                    error: thaterror
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })

    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        errorMessage: 'Article not found',
        name: 'Jånny Långbottom'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Jånny Långbottom'
    })
})

app.listen(3000, () => {
     console.log('Server is up on port 3000')
})