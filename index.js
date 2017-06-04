const jsonfile = require('jsonfile')
const client = require('@google/maps').createClient({
  key: 'YOUR_API_KEY',
  Promise: Promise
})

jsonfile.spaces = 2

const file = './data.json'

let data = []

const places = [
  {
    query: "Place Name Street Address Postcode"
  },
]

places.map( ({ query }, i) => {

  setTimeout( () => {

    console.log(i)

    client.places({ query }, (err, response) => {

      if (err || response.json.status !== 'OK') return console.error('error:', err, response.json.status, response.json.error_message)
      else {

        const { geometry: { location: { lat, lng } }, place_id } = response.json.results[0]

        console.log(place_id)

        data.push({
          coordinates: [ lng, lat ],
          place_id
        })

        if (i === places.length -1) {

          jsonfile.writeFile(file, data, err => {
            err ? console.error(err) : console.log('🍻  done')

            process.exit()
          })

        }

      }

    })

  }, i * 1000 )

})
