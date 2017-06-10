const request = require('request');

var getWeather = (lat, long, callback) => {
    request({
    url: `https://api.darksky.net/forecast/c363573fe7a4e6b18794a8c8da76ec3a/${lat},${long}`,
    json: true
    },(error, response, body) => {
    if(error)
    {
        callback('Unable to contact Weather Forecast Servers');
    }
    else if(response.statusCode == 400)
    {
        callback('Unable to fetch weathers');
    }
    else
    {
        callback(undefined,{
            temperature: body.currently.temperature,
            appTemp: body.currently.apparentTemperature
        });
    }
    });
}

module.exports = {
    getWeather
};
