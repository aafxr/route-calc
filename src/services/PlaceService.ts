import { POST, PUT, server_url } from "../constants";
import { PlaceType } from "../types/PlaceType";

class PlaceServise{
    constructor(private server_url: string){}

    getConfig(place: PlaceType, method: string): RequestInit{
        return {
            method,
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(place)
        }
    }

    async add(place: PlaceType){
            return await fetch(`${this.server_url}/places`, this.getConfig(place, POST))
            .catch(console.error)
    }

    async getById(placeId: string): Promise<PlaceType | undefined>{
        return await fetch(`${this.server_url}/places/${placeId}`)
            .then(res=> res.json())
    }

    async getAll(): Promise<PlaceType[]>{
        return await fetch(`${this.server_url}/places`)
            .then(res => res.json())
            .then(res => Array.isArray(res) ? res : [res])
    }

    async update(place: PlaceType){
        return await fetch(`${this.server_url}/places/${place.id}`, this.getConfig(place, PUT))
    }
}

export const placeService = new PlaceServise(server_url)