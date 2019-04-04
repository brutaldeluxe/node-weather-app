const request = require('request')
const base_url = 'https://api.darksky.net/forecast/ca915f009758d4bbddb4d9de3ad22385/'

const forecast = (latitude, longitude, callback) => {
    url = base_url+latitude+','+longitude+'/?units=si'

    request({url: url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
        }
        else if(body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, body.currently.summary+' and currently '+body.currently.temperature+ '`C. '+ body.daily.data[0].summary)
        }
    })
}

module.exports = forecast