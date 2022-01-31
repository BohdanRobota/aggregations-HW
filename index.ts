const MongoClient = require("mongodb").MongoClient;
import { City } from './classes';
const url = "mongodb://localhost:27017/agregations";
const mongoClient = new MongoClient(url);
import {
  returnStatesPipeline,
  returnCitiesPipeline,
  returnStatesArrPipeline,
  returnFirst10CitiesPipeline
} from './agregations';

async function run() {
  try {
    await mongoClient.connect();
    const db = mongoClient.db();
    const cities = db.collection('cities');
    const states = db.collection('states');

    // Convert the value of the "population" field to numeric values for all cities
    function convertCityPopulation(city: City) {
      cities.updateOne({
        "_id": city._id
      }, {
        "$set": {
          "population": parseInt(city.population as string)
        }
      });
    }
    cities.find().forEach(convertCityPopulation);

    //Return states [{state,capital,populationOfTheCapital}];
    console.log(await states.aggregate(returnStatesPipeline).toArray());

    //Return cities [{city,state,state_flag_url}] with a population rank from 20 to 30 in rank
    console.log(await states.aggregate(returnCitiesPipeline).toArray());

    //Return states array [{ state,links: {website,facebook,twitter}, cities: [{city,population}] }]
    console.log(await states.aggregate(returnStatesArrPipeline).toArray());

    //Return first 10 cities from California, Texas and Florida by population
    const citiesByPopulation = await states.aggregate(returnFirst10CitiesPipeline).toArray();
    console.log(JSON.stringify(citiesByPopulation, null, 4));


    //Delete cities with population less for 1 million people
    // function returnId(city:City){
    //   return city._id;
    // }
    // const idsList = await cities.aggregate([{ $match: { 'population': { '$lt': 1000000 } } }]).map(returnId).toArray();
    // await cities.deleteMany({ _id: { $in: idsList } });

  } catch (err) {
    console.log(err);
  }
}
run();