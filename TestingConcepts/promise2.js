const Request = require('request');

var geoCodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodeAdd = encodeURIComponent(address);
        Request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAdd}`,
            json: true
            },(error, response, body) => {
        if(error)
        {
            reject('Unable to connect to Google Servers');
        }
        else if(body.status === 'OK')
        {
            resolve({address: body.results[0].formatted_address,
                                latitude: body.results[0].geometry.location.lat,
                                longitude: body.results[0].geometry.location.lng
                                }); 
        }
        else
        {
            reject('Address Not Found');
        }
        }
        )
    })

};

geoCodeAddress('19147').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});