// Return states [{state,capital,populationOfTheCapital}];

export const returnStatesPipeline = [
    {
      $lookup: {
        from: 'cities',
        localField: 'capital_city',
        foreignField: 'city',
        as: 'cities'
      }
    },
    {
      $unwind: { path: '$cities' }
    },
    {
      $project: {
        state: 1,
        capital: '$capital_city',
        populationOfTheCapital: '$cities.population'
      }
    }
  ];

