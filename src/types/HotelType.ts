import { CoordinatesType } from "./CoordinatesType";

export interface HotelType {
    type: number;
    id: string;
    name: string;
    formatted_address: string;
    location: CoordinatesType;
    position: CoordinatesType;
    photos: string[];
    price: number
}