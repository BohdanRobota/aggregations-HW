//Return states array [{ state,links: {website,facebook,twitter}, cities: [{city,population}] }]


export const returnStatesArrPipeline = [
  {
    $lookup: {
      from: 'cities',
      localField: 'state',
      foreignField: 'state',
      as: 'cities'
    }
  },
  {
    $addFields: {
      links: {'website':'$website','facebook':'$facebook_url','twitter':'$twitter_url'}
    }
  },
  {
    $project: {
      state:1,
      links:1,
      cities:{
        city:1,
        population:1
      }
    }
  }
];