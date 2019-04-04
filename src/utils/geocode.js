const request = require('request')
const base_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const mapbox_token = 'pk.eyJ1IjoibmF0YW5vaiIsImEiOiJjanR6aDBmeWMyamIyNDBucDlmcmsxeXdjIn0.7snOAygYtOqz0a6XDHDUeQ'


const geocode = (address, callback) => {
    let url = base_url + encodeURIComponent(address) +'.json?access_token='+mapbox_token

    request({url: url, json:true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to map service', undefined)
        }
        else if( body.error) {
            callback('Unable to find location for '+address, undefined)
        }
        else if( body.features.length === 0) {
            callback('No matching place found', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode