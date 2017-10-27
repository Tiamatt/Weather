import { UnitTypeEnum } from "../Enums/UnitTypeEnum.enum";

export class MUnitType{
    unit: UnitTypeEnum;
    unitIcon: string;
    unitsForTodayWeather: string[];

    readonly 
    constructor(unit: UnitTypeEnum, unitIcon: string, unitsForTodayWeather: string[]){
        this.unit = unit;
        this.unitIcon = unitIcon;
        this.unitsForTodayWeather = unitsForTodayWeather;
    }
    
    static getData(_unit: UnitTypeEnum): MUnitType
    {        
        if(_unit == UnitTypeEnum.imperial)
        {
            return new MUnitType (
                UnitTypeEnum.imperial,
                'wi wi-fahrenheit',
                ['F','F', '%','mph','kPa']
            );
        }
        else
        {
            return new MUnitType (
                UnitTypeEnum.metric, 
                'wi wi-celsius',
                ['C','C', '%','m/s','kPa']
            );
        }
    }
}