import { HotelType } from "./HotelType";
import { PlaceType } from "./PlaceType";

export interface PointType extends PlaceType {
    [id:string]: PlaceType
}