const request = require('request');

var geoCodeAddress = (address, callback) => {

    var encodeAdd = encodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAdd}`,
        json: true
        },(error, response, body) => {
        if(error)
        {
            callback('Unable to connect to Google Servers');
        }
        else if(body.status === 'OK')
        {
            callback(undefined,{address: body.results[0].formatted_address,
                                latitude: body.results[0].geometry.location.lat,
                                longitude: body.results[0].geometry.location.lng
                                }); 
        }
        else
        {
            callback('Address Not Found');
        }
    });
}

module.exports = {
    geoCodeAddress
} 