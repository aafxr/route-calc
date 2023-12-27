import { CoordinatesType } from "./CoordinatesType";

export interface PlaceType {
    type: 2;
    id: string;
    name: string;
    formatted_address: string;
    location: CoordinatesType;
    position: CoordinatesType;
    photos: string[];
}