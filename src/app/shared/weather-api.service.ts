import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'; // add HttpModule into imports in app.module.ts
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'; // need for map
import { Subject } from 'rxjs/Subject';

@Injectable() // need for http

export class WeatherApiService{

    constructor(private http: Http){}

    // BEGIN: LISTEN TO FIELDS -----------------------------------------------------------

    // listen in CurrentWeatherComponent
    // updated in  WeatherApiService -> callGeolocationApi() 
    listenToGeolocation = new Subject();
    // listen in CurrentWeatherComponent
    // updated in  WeatherApiService -> updateTodayWeatherData() 
    listenToTodayWeatherData = new Subject();
    // listen in ForecastWeatherComponent
    // updated in  WeatherApiService -> updateForecastWeatherData() 
    listenToForecastWeatherData = new Subject();
    // listen in CurrentWeatherComponent
    // updated in  WeatherApiService -> updateSelectedUnitType() 
    listenToSelectedUnitType = new Subject();

    // END: LISTEN TO FIELDS -------------------------------------------------------------





    
    // BEGIN: DEFINE AND ASSIGN DEFAULT FIELDS -----------------------------------------------------------

    // should NOT be modified
    unitType = {
        metric: { 
            unit: 'metric', 
            weatherIcon:'wi wi-celsius',
            today: ['C','C','C', '%','m/s','kPa']
        },
        imperial:{ 
            unit: 'imperial', 
            weatherIcon:'wi wi-fahrenheit',
            today: ['F','F','F', '%','mph','kPa']
        }
    };

    // default value is metric
    selectedUnitType = this.unitType.metric;

    // values by default if location API is not working
    geolocation = {
        city: "Duluth2323", // default value, will be updated  // kali
        country: "US2323", // default value, will be updated  // kali
        loc:"34.0029,-84.1446" // default value, will be updated
    };

    // values by default if weather API is not working
    todayWeatherData = {
        name:['temp', 'maxTemp', 'minTemp', 'humidity', 'windSpeed', 'pressure'],    
        title:['Average temperature','Highest temperature','Lowest temperature','Humidity','Wind speed','Pressure'],
        value:[10, 11, 9, 74, 1.51, 990], // default value, will be updated
        unit:this.unitType.metric.today,   // default value, will be updated
        icon:['http://openweathermap.org/img/w/02d.png','wi wi-thermometer','wi wi-thermometer-exterior','wi wi-humidity','wi wi-strong-wind','wi wi-barometer']
        // kali! icon[0] should be grabed from weather api
    };

    // values by default if weather API is not working
    forecastWeatherData = {
        weekday: this.getWeekdayArr(),
        icon: ['http://openweathermap.org/img/w/02d.png','http://openweathermap.org/img/w/01d.png', 'http://openweathermap.org/img/w/03d.png', 'http://openweathermap.org/img/w/04d.png', 'http://openweathermap.org/img/w/02d.png'],
        temp: [999, 8, 9, 10, 11]
    };

    // END: DEFINE AND ASSIGN FIELDS -----------------------------------------------------------






  

    // this method is called in: 
    // a) CurrentWeatherComponent in ngOnInit()
    getGeolocationApi(){
        this.callGeolocationApi().subscribe(
        (_response: any[]) => console.log(_response),
        (_error) => {
            console.log(_error);
            alert('Failed to get data from location API. Default city will be displayed');
        }
        );
    }

    // this method is called in: 
    // a) WeatherApiService in callGeolocationApi()
    // b) SwitcherComponent in onSwitchUnit()
    getWeatherApi(_unit: string){
        this.callWeatherApi(_unit).subscribe(
            (_response: any[]) => console.log(_response),
            (_error) => {
                console.log(_error);
                alert('Failed to get data from weather API. Default weather data will be displayed.');
            }
        );
    }






    // BEGIN: PRIVATE METHODS ----------------------------------------------------------------

    // call API data:
    // a) to update this.geolocation
    // b) to update this.todayWeatherData via calling getWeatherApi();
    // c) to update this.forecastWeatherData via calling getWeatherApi();
    // d) to update this.todayWeatherData via calling getWeatherApi();
    private callGeolocationApi(): Observable<any>{
        let apiUrl = 'http://ipinfo.io';
        return this.http.get(apiUrl)
        .map((response: Response) => { 
            this.geolocation = response.json();
            this.listenToGeolocation.next(this.geolocation);
            this.getWeatherApi(this.selectedUnitType.unit);
            return 'GeolocationApi succeeded';
        })
        .catch(error => {
            console.log(error);
            return Observable.throw(error.json());
        });
    }

    // get API data to update:
    // a) this.todayWeatherData
    // b) this.forecastWeatherData
    // c) this.selectedUnitType
    private callWeatherApi(_unit:string): Observable<any>{
        this.turnLocToUrlPart();
        let url = 'http://api.openweathermap.org/data/2.5/forecast/daily?appid=87232dad7a32939d0de2bfe4f97d1c92';
        url = url.concat(this.turnLocToUrlPart()); // add location param to url (exp: &lat=23&lon=20)
        url = url.concat('&units=' + _unit); // add unit param to url (exp: &units=metric)
        return this.http.get(url)
        .map((response:Response) => {
            const _data = response.json();
            this.updateSelectedUnitType(_unit);
            this.updateTodayWeatherData(_data, _unit);
            this.updateForecastWeatherData(_data);          
            return 'WeatherApi succeeded';
        })
        .catch(error => {
            console.log(error);
            return Observable.throw(error.json());
        });        
    }

    private updateTodayWeatherData(_apiData, _unit){
        // update value
        this.todayWeatherData.value = [];
        let _day = Math.round(_apiData.list[0].temp.day);
        this.todayWeatherData.value.push(_day);
        let _maxTemp =  Math.round(_apiData.list[0].temp.max);
        this.todayWeatherData.value.push(_maxTemp);        
        let _minTemp =  Math.round(_apiData.list[0].temp.min);
        this.todayWeatherData.value.push(_minTemp);        
        let _humidity = Math.round(_apiData.list[0].humidity);
        this.todayWeatherData.value.push(_humidity);        
        let _speed = _apiData.list[0].speed;
        this.todayWeatherData.value.push(_speed);        
        let _pressure = Math.round(_apiData.list[0].pressure);
        this.todayWeatherData.value.push(_pressure);
        let _majorIcon = "http://openweathermap.org/img/w/" + _apiData.list[0].weather[0].icon + ".png";
        this.todayWeatherData.icon[0] = _majorIcon;
        // update unit
        this.todayWeatherData.unit = this.unitType[_unit].today;
        
        this.listenToTodayWeatherData.next(this.todayWeatherData);
    }

    private updateForecastWeatherData(_apiData){
        this.forecastWeatherData.temp = [];
        this.forecastWeatherData.icon = [];
        for(var i=1; i<6; i++){
            let _day = Math.round(_apiData.list[i].temp.day);
            this.forecastWeatherData.temp.push(_day);
            let _icon =  "http://openweathermap.org/img/w/" + _apiData.list[i].weather[0].icon + ".png";
            this.forecastWeatherData.icon.push(_icon);
        }
        this.listenToForecastWeatherData.next(this.forecastWeatherData);
    }

    private updateSelectedUnitType(_unit){
        this.selectedUnitType = this.unitType[_unit];
        this.listenToSelectedUnitType.next(this.selectedUnitType);
    }

    private turnLocToUrlPart(){
        var result = this.geolocation.loc.replace(',', '&lon=');
        result = ('&lat=').concat(result);
        return result;
        // return '&lat=23&lon=-120'; // for test
    }

    private getWeekdayArr(){
        var result = [];
        var now = new Date();
        var weekNameArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var weekNum = now.getDay();
        for(var i=weekNum + 1; i<weekNum+6; i++ ){            
            result.push(weekNameArr[i]);
        }
        return result;
    }

    // END: PRIVATE METHODS ----------------------------------------------------------------

}