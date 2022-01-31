// Return states [{state,capital,populationOfTheCapital}];

export const returnStatesPipeline = [
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
        state: 1,
        capitalInfo: {
          $filter: {
            input: '$cities',
            as: 'currentCity',
            cond: {
              $eq: ['$$currentCity.city', '$capital_city']
            }
          }
        }
      }
    },
    {
      $unwind: { path: '$capitalInfo' }
    },
    {
      $project: {
        state: 1,
        capital: '$capitalInfo.city',
        populationOfTheCapital: '$capitalInfo.population'
      }
    }
  ];

