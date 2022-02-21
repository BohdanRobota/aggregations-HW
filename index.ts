const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/aggregations";
const mongoClient = new MongoClient(url);
import {
  returnStatesPipeline,
  returnCitiesPipeline,
  returnStatesArrPipeline,
  returnFirst10CitiesPipeline,
  citiesIntoPolygonPipeLine
} from './aggregations';

async function run() {
  try {
    await mongoClient.connect();
    const db = mongoClient.db();
    const cities = db.collection('cities');
    const states = db.collection('states');

    // Convert the value of the "population" field to numeric values for all cities
    await cities.updateMany({}, [
      { $set: { 'population': { $toInt: '$population' } } }
    ]);

    //Return states [{state,capital,populationOfTheCapital}];
    console.log(await states.aggregate(returnStatesPipeline).toArray());

    //Return cities [{city,state,state_flag_url}] with a population rank from 20 to 30 in rank
    console.log(await cities.aggregate(returnCitiesPipeline).toArray());

    //Return states array [{ state,links: {website,facebook,twitter}, cities: [{city,population}] }]
    console.log(await states.aggregate(returnStatesArrPipeline).toArray());

    //Return first 10 cities from California, Texas and Florida by population
    const citiesByPopulation = await states.aggregate(returnFirst10CitiesPipeline).toArray();
    console.log(JSON.stringify(citiesByPopulation, null, 4));


    //Delete cities with population less for 1 million people
    await cities.deleteMany({ 'population': { '$lt': 1000000 } });

    //Return all cities [{ city, location: { latitude, longitude } }] into polygon
    console.log(await cities.aggregate(citiesIntoPolygonPipeLine).toArray());

  } catch (err) {
    console.log(err);
  }
}
run();