export class MTodayWeather{
    // fields
    tempValue: number;
    tempIconLink : string; // mandatory
    otherParamValues : number[]; // mandatory
    // consts
    static readonly paramName = ['maxTemp', 'minTemp', 'humidity', 'windSpeed', 'pressure'];
    static readonly iconLinks = ['./assets/icon-max-temp.png','./assets/icon-min-temp.png','./assets/icon-humidity.png','./assets/icon-wind.png','./assets/icon-pressure.png'];
    
    constructor (tempValue: number, tempIconLink : string, otherParamValues : number[]){
        this.tempValue = tempValue,
        this.tempIconLink = tempIconLink,
        this.otherParamValues = otherParamValues        
    }

    static getDefault():MTodayWeather{
        return new MTodayWeather(
            10, //tempValue, metric
            'http://openweathermap.org/img/w/02d.png', // tempIconLink
            [12, 10, 74, 1.51, 880], // otherParamValue, metric
        )
    }

    // kali!!
    // // Note! icon[0] should be grabed from weather api - it will be modified
    //['http://openweathermap.org/img/w/02d.png','../../assets/icon-max-temp.png','../../assets/icon-min-temp.png','../../assets/icon-humidity.png','../../assets/icon-wind.png','../../assets/icon-pressure.png']
}