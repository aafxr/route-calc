import { POST, PUT, server_url } from "../constants";
import { HotelType } from "../types/HotelType";

class HotelServise{
    constructor(private server_url: string){}

    getConfig(place: HotelType, method: string): RequestInit{
        return {
            method,
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(place)
        }
    }

    async add(place: HotelType){
            return await fetch(`${this.server_url}/hotels`, this.getConfig(place, POST))
            .catch(console.error)
    }

    async getById(placeId: string): Promise<HotelType | undefined>{
        return await fetch(`${this.server_url}/hotels/${placeId}`)
            .then(res=> res.json())
    }

    async getAll(): Promise<HotelType[]>{
        return await fetch(`${this.server_url}/hotels`)
            .then(res => res.json())
            .then(res => Array.isArray(res) ? res : [res])
    }

    async update(place: HotelType){
        return await fetch(`${this.server_url}/hotels/${place.id}`, this.getConfig(place, PUT))
    }
}

export const hotelService = new HotelServise(server_url)