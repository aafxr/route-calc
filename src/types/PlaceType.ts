import { CoordinatesType } from './CoordinatesType';

export interface PlaceType {
  type: number;
  id: string;
  name: string;
  formatted_address: string;
  location: CoordinatesType;
  position: CoordinatesType;
  rate: number;
  photos?: string[];
}
