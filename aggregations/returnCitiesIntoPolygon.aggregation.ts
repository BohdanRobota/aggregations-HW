/*Return all cities [{ city, location: { latitude, longitude } }] 
into polygon: 
[{ latitude: 37.751703, longitude: -122.971027 },
{ latitude: 38.194340, longitude: -121.513280 },
{ latitude: 36.650067, longitude: -119.053988 },
{ latitude: 34.605100, longitude: -116.720952 },
{ latitude: 33.475337, longitude: -117.549011 },
{ latitude: 33.352874, longitude: -118.420805 }]*/


export const citiesIntoPolygonPipeLine = [
  {
    $addFields: {
      'coordinates': ['$latitude', '$longitude'],
      'location': { 'latitude': '$latitude', 'longitude': '$longitude' }
    }
  },
  {
    $match: {
      'coordinates': {
        '$geoWithin': {
          '$polygon': [
            [37.751703, -122.971027],
            [38.194340, -121.513280],
            [36.650067, -119.053988],
            [34.605100, -116.720952],
            [33.475337, -117.549011],
            [33.352874, -118.420805]
          ]
        }
      }
    }
  },
  {
    $project: {
      'city': 1,
      'location': 1
    }
  }
]