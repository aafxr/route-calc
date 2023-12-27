import { CoordinatesType } from "./CoordinatesType"
import { StepType } from "./StepType"

export interface RouteType{
    steps: StepType[]
    day: number
    stepList: string[]
    overTime: number
    time: number
    bestDayTimeEnd: number
    position: CoordinatesType
    score: number
    price: number
    road:{
        distance: number;
        time: number
    }
}