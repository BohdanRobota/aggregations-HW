import { ObjectId } from "mongodb";

export class City {
  constructor(public city: string,
    public growth_from_2000_to_2013: string,
    public latitude: number,
    public longitude: number,
    public population: number | string,
    public rank: string,
    public state: string,
    public _id?: ObjectId) { }
}