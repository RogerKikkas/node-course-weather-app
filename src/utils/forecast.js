const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=677e1b6d0e6212b827d32df8545b5b87&query=${latitude},${longitude}`

  request({ url, json: true}, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather services!', undefined)
    } else if (body.error) {
      callback('Unable to find location.', undefined)
    } else {
      const { current } = body
      const returnMessage = `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} out. The humidity is ${current.humidity}%.`
      
      callback(undefined, returnMessage)
    }
  })
}

module.exports = forecast