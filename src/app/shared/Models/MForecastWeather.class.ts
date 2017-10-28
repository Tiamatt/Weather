export class MForecastWeather{
    // fields
    iconLinks: string[];
    tempValues: number[];
    // const
    static readonly weekdays: string[] = MForecastWeather.getWeekdayArr();

    constructor(iconLinks: string[],tempValues: number[]){
        this.iconLinks = iconLinks;
        this.tempValues = tempValues;  
    }

    static getDefault(): MForecastWeather{
        return new MForecastWeather(
            ['https://openweathermap.org/img/w/02d.png','https://openweathermap.org/img/w/01d.png', 'https://openweathermap.org/img/w/03d.png', 'https://openweathermap.org/img/w/04d.png', 'https://openweathermap.org/img/w/02d.png'],
            [9, 8, 9, 10, 11]
        );
    }


    private static getWeekdayArr(): string[]{
        var result = [];
        var now = new Date();
        var weekNameArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var weekNum = now.getDay();
        for(var i=weekNum + 1; i<weekNum+6; i++ ){            
            result.push(weekNameArr[i]);
        }
        return result;
    }

}