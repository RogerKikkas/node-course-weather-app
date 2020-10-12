const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoicm9nZXJrIiwiYSI6ImNqcnl2N3M5YjB5cTA0NHBrZnFhMDBkbW0ifQ.KnZn9TOqId1JhVT_EdRsDw&limit=1`

  request({ url, json: true}, (error, { body }) => {
    const { features } = body

    if (error) {
      callback('Unable to connect to location services!', undefined)
    } else if (features.length === 0) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      const location = features[0]
      const coordinates = location.center
      const data = {
        location: location.place_name,
        latitude: coordinates[1],
        longitude: coordinates[0]
      }

      callback(undefined, data)
    }
  })
}

module.exports = geocode