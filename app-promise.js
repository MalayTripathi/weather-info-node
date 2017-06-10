const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
            .options({
                a:{
                    alias: 'address',
                    demand: true,
                    string: true,
                    describe: 'Address to fetch weather for'
                }
            })
            .help()
            .alias('help', 'h')
            .argv;

var encodeAdd = encodeURIComponent(argv.address);

var geoURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAdd}`;

axios.get(geoURL).then((response) => {
    if(response.data.status === 'ZERO_RESULTS')
    {
        throw new Error('Unable to fetch Location for the address');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var long  = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/c363573fe7a4e6b18794a8c8da76ec3a/${lat},${long}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temp = response.data.currently.temperature;
    var feelTemp = response.data.currently.apparentTemperature;
    console.log(`It is ${temp} currently. It feels like ${feelTemp}`);

}).catch((errorMessage) => {
    if(errorMessage.code === 'ENOENT')
    {
        console.log('Unable to connect to API Servers');
    }
    else
    {
        console.log(errorMessage.message);
    }
});
