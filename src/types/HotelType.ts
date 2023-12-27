import { CoordinatesType } from "./CoordinatesType";

export interface HotelType {
    type: 1;
    id: string;
    name: string;
    formatted_address: string;
    location: CoordinatesType;
    position: CoordinatesType;
    photos: string[];
}