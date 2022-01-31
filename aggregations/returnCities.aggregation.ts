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
    $project: {
      city: 1,
      state_flag_url: '$stateInfo.state_flag_url',
      state: 1,
      rank: { '$toInt': '$rank' }
    }
  },
  {
    $match: {
      'rank': { '$gt': 20, '$lt': 30 }
    }
  }
];