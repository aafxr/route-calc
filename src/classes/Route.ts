import { HOTEL, PLACE, ROAD } from "../constants";
import { CoordinatesType } from "../types/CoordinatesType";
import { HotelType } from "../types/HotelType";
import { PointType } from "../types/PointType";
import { RouteType } from "../types/RouteType";

const {sin, cos, asin, min, sqrt, round, ceil, floor, PI} = Math

const deg2rad = (deg: number) => deg * PI / 180

class Route {

    private timestamp: number | undefined;
    private hotel: HotelType | undefined;

    // private days: number;
    // private depth: number;
    // private density: number;

    private routes: number | undefined;
    private maxRouteScore: number | undefined;

    constructor(private days: number, private depth: number , private density: number){}

    setHotel(hotel: HotelType) {
        this.hotel = hotel;
    }

    distAB(a: CoordinatesType,b: CoordinatesType)
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

    getDuration(distance: number): number {

        if(distance < 1) {
            return ceil(60 / 4 * distance);
        }
        if(distance < 5) {
            return ceil(60 / 20 * distance);
        }
        if(distance < 10) {
            return ceil(60 / 30 * distance);
        }

        return ceil(60 / 40 * distance);
    }

    showTime(minutes: number): string {
        let hours: number  = floor(minutes / 60);
        let _minutes: number  = minutes % 60;
        return hours + ":" + (_minutes < 10 ? '0' + _minutes : _minutes);
    }

    nextStep(route: RouteType, points: PointType, point = false) {
        if(!this.hotel) 
            throw new Error('Set hotel before calc route')

        const step = route.steps.length || 0;
        //echo "step begin: ".step." runtime ".(time() - this.timestamp)."<br />";
        /*echo '<pre>';
        print_r(route);
        echo '</pre>'; */
        if(step == 0) {
            route.day = 1;
            route.stepList = [];
            route.overTime = 0;
            route.time = 13*60 - this.density * 60 / 2;
            route.bestDayTimeEnd = 13*60 + this.density * 60 / 2;
            route.position = this.hotel.position;
            route.score = 0;
            route.road = {
                  distance: 0,
                  time: 0
            };
            route.steps[route.steps.length] = {
                type: HOTEL,
                day : route.day,
                timeStart: route.time,
                timeEnd: route.time,
                duration: 0,
                place: this.hotel.id
            };
            route.price += this.hotel.price;
        } else {

            // get road
            let roadDist = this.distAB(route['position'],point.position);
            let roadDuration = this.getDuration(roadDist);
            route.road.distance += roadDist;
            route.road.time += roadDuration;
            route.time += roadDuration
            route.steps[route.steps.length] = {
                type: ROAD,
                distance: roadDist,
                duration: roadDuration,
                day : route.day,
                timeStart: route.time,
                timeEnd: route.time,
            };

            route.steps[route.steps.length] = {
                type: PLACE,
                day : route['day'],
                duration: point['duration'] * this.depth,
                timeStart: route['time'],f
                timeEnd:  (route['time'] += point['duration']* this.depth),
                place: point['id']
            };
            route['stepList'][] = point['id'];
            route['position'] = point['position'];
            route['score'] += point['score'];
            route['price'] += point['price'];

            if(route['time'] > route['bestDayTimeEnd']) {
                // get road
                roadDist = this.distAB(route['position'],this.hotel['position']);
                roadDuration = this.getDuration(roadDist);
                route['road']['distance'] += roadDist;
                route['road']['time'] += roadDuration;
                route['steps'][] = [
                    'type' => 'road',
                    'distance' => roadDist,
                    'duration' => roadDuration ,
                    'day'  => route['day'],
                    'timeStart' => route['time'],
                    'timeEnd' => (route['time'] += roadDuration),
                ];

                route["overTime"] += route['time'] - route['bestDayTimeEnd'];

                route['day'] += 1;
                route['steps'][] = [
                    'type' => 'hotel',
                    'day'  => route['day'],
                    'timeStart' => route['time'],
                    'timeEnd' => route['time'],
                    'duration' => 0,
                    'place' => this.hotel
                ];

                route["time"] = 13*60 - this.density * 60 / 2;
                route['position'] = this.hotel['position'];
            }
        }

        //if(step < 2) {

        if(
            (count(points) == 0) ||
            (route['day'] > this.days)
        ) {
            //route['rt'] = route['score'] * 20 - (round( route['road']['distance']) + route['road']['time'] + route['overTime']);
            route['roadTime'] = route['road']['time'];
            sort(route['stepList']);
            this.routes[] = route;
            if(route['score'] > this.maxRouteScore) {
                this.maxRouteScore = route['score'];
            }

        } else {
            foreach (points as pointId => point) {
                nextPoints = points;
                unset(nextPoints[pointId]);
                this.nextStep(route, nextPoints, point);
            }
        }
        //}
    }

    calc(points) {

        startTime = microtime();

        places=[];
        foreach (points as point) {
            places[point['id']] = point;
        }

        route = [
            'steps' => []
        ];


        this.nextStep(route, points);
        echo "route count=".count(this.routes)."<br />";
        echo "best=".this.maxRouteScore."<br />";
        maxRouteScore = round(this.maxRouteScore * 0.8);

        scoreColumn  = array_column(this.routes, 'score');
        timeColumn  = array_column(this.routes, 'roadTime');
        array_multisort(scoreColumn, SORT_DESC, timeColumn, SORT_ASC, this.routes);
        showedVariants = [];

        echo '<table class="table">';
        foreach (this.routes as route) {
            //if(route['score'] < maxRouteScore) continue;
            variantCode = implode(",",route['stepList']);
            //if(in_array(variantCode,showedVariants)) continue;
            showedVariants[] = variantCode;
            rt = route['score'] * 20 - (round( route['road']['distance']) + route['road']['time'] + route['overTime']);
            echo '<tr>';
            echo '<td>' . route['score'] . '</td>';
            echo '<td>' . route['road']['distance'] . 'км</td>';
            echo '<td>' . route['road']['time'] . 'мин</td>';
            echo '<td>' . route['overTime'] . '</td>';
            echo '<td style="width: 50%;"><div class="route">';

            foreach (route['steps'] as step) {
                if (step['type'] == "hotel") {
                    echo '<div class="step hotel">';
                    echo '<div class="time-start">' . this.showTime(step['timeStart']) . '</div>';
                    echo '<div class="time-end">' . this.showTime(step['timeEnd']) . '</div>';

                    echo 'Отель ' . step['day'] . ' сутки </div>';
                }
                if (step['type'] == "road") {
                    echo '<div class="step road">' . number_format(step['distance'], 1) . 'км</div>';

                }
                if (step['type'] == "place") {
                    echo '<div class="step place">';
                    echo '<div class="time-start">' . this.showTime(step['timeStart']) . '</div>';
                    echo '<div class="time-end">' . this.showTime(step['timeEnd']) . '</div>';
                    echo places[step['place']]['name'];
                    echo '</div>';

                }
            }
            echo '</div></td>';
            echo '<td>' .variantCode.'</td>';
            echo '</tr>';
        }
        echo '</table>';
        echo 'runtime:'.(microtime()-startTime)."<br />";
        echo 'memory:'.(memory_get_usage())."<br />";
    }


}