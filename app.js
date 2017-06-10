const yargs = require('yargs');

const geoCode = require('./Geocode/geocode.js');

const weather = require('./weather.js');

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

geoCode.geoCodeAddress(argv.a, (errorMessage, result) => {
    if(errorMessage)
    {
        console.log(errorMessage);
    }
    else
    {
        console.log(result.address);
        weather.getWeather(result.latitude, result.longitude, (errorMessage, result) => {
            if(errorMessage)
            {
                console.log(errorMessage);
            }
            else
            {
                console.log(`It is currently ${result.temperature}. It feels like ${result.appTemp}.`);
            }
        });
    }
});

//body is the html body tag. When we make request to a website the response that comes is a body