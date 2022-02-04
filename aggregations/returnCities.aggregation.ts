// Return cities [{city,state,state_flag_url}] with a population rank from 20 to 30 in rank

export const returnCitiesPipeline = [
  {
    $lookup: {
      from: 'states',
      localField: 'state',
      foreignField: 'state',
      as: 'stateInfo'
    }
  },
  {
    $unwind: { path: '$stateInfo' }
  },
  {
    $addFields: { population_rank: '$stateInfo.population_rank' }
  },
  {
    $project: {
      city: 1,
      state_flag_url: '$stateInfo.state_flag_url',
      state: 1,
      population_rank: { '$toInt': '$population_rank' }
    }
  },
  {
    $match: {
      'population_rank': { '$gte': 20, '$lte': 30 }
    }
  }
];