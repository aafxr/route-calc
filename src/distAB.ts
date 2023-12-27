import { CoordinatesType } from "./types/CoordinatesType";

const {sin, cos, asin, min, sqrt, PI} = Math

const deg2rad = (deg: number) => deg * PI / 180

function distAB(a: CoordinatesType,b: CoordinatesType)
    {
        const pointA = a;//explode(",",a);
        const pointB = b;//explode(",",b);
        const delta_lat = pointA[0] - pointB[0];
        const delta_lon = pointA[1] - pointB[1];

        const earth_radius = 6372.795477598;

        const alpha    = delta_lat/2;
        const beta     = delta_lon/2;
        const _a        = sin(deg2rad(alpha)) * sin(deg2rad(alpha)) + cos(deg2rad(pointA[0])) * cos(deg2rad(pointA[1])) * sin(deg2rad(beta)) * sin(deg2rad(beta)) ;
        const c        = asin(min(1, sqrt(_a)));
        let distance = 2*earth_radius * c;
        distance = Number(distance.toFixed(4));

        return distance;
    }