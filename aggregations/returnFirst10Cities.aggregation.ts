// Return first 10 cities from California, Texas and Florida by population

export const returnFirst10CitiesPipeline = [
  {
    $match: {
      $or: [{ state: 'California' }, { state: 'Texas' }, { state: 'Florida' }]
    }
  },
  {
    $lookup: {
      from: 'cities',
      localField: 'state',
      foreignField: 'state',
      as: 'cities'
    }
  },
  {
    $project: {
      'state': 1,
      'cities': 1
    }
  },
  {
    $unwind: {
      path: '$cities'
    }
  },
  {
    $sort: {
      'cities.population': -1
    }
  },
  {
    $group: {
      _id: '$_id',
      state: { $first: '$state' },
      citiesByPopulation: {
        $push: '$cities'
      }
    }
  },
  {
    $project: {
      state: 1,
      citiesByPopulation: {
        '$slice': ["$citiesByPopulation", 0, 10]
      }
    }
  }
];