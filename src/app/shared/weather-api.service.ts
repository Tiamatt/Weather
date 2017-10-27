import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'; // add HttpModule into imports in app.module.ts
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'; // need for map // kali // import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// models
import { MUnitType } from './Models/MUnitType.class';
import { MGeolocation } from './Models/MGeolocation.class';
import { MCurrentWeather } from './Models/MCurrentWeather.class';
import { UnitTypeEnum } from './Enums/UnitTypeEnum.enum';
import { MForecastWeather } from './Models/MForecastWeather.class';

@Injectable() // need for http

export class WeatherApiService{
    // listeners (data holders) with initial values
    unitListener: BehaviorSubject<UnitTypeEnum>= new BehaviorSubject(UnitTypeEnum.metric);
    geolocationListener: BehaviorSubject<MGeolocation>= new BehaviorSubject(MGeolocation.getDefault());
    currentWeatherListener: BehaviorSubject<MCurrentWeather>= new BehaviorSubject(MCurrentWeather.getDefault());
    forecastWeatherListener: BehaviorSubject<MForecastWeather> = new BehaviorSubject(MForecastWeather.getDefault());
    
    constructor(private http: Http){}

    // called once from AppComponent
    getUsersCurrentLocation(){
        this.callGeolocationApi().subscribe(
            (_response: any[]) => {
                let _address =  _response['city'] + ' ' + _response['region']  + ' ' + _response['country'];
                let _lonAndLat = _response['loc'];
                if(_address && _lonAndLat)
                {
                    this.geolocationListener.next(new MGeolocation(_address, _lonAndLat));
                    this.getWeatherData();
                }
            },
            (_error) => {
                console.log(_error);
                alert('Failed to get data from geolocation API. Default location will be displayed');
            }
        );
    }

    // called from WeatherApiService -> getUsersCurrentLocation()
    // kali
    getWeatherData(){
        this.callWeatherApi().subscribe(
            (_response: any[]) => {
                this.updateCurrentWeather(_response);
                this.updateForecastWeatherData(_response);
            }, 
            (_error) => {
                console.log(_error);
                alert('Failed to get data from weather API. Default weather data will be displayed.');
            }
        );
    }

    // BEGIN: PRIVATE METHODS ---------------------------------------------------------------- 
    
    private callGeolocationApi(): Observable<any>{
        let apiUrl = 'http://ipinfo.io';
        return this.http.get(apiUrl).map((response: Response) => response.json())
        .catch(error => {
            console.log(error);
            return Observable.throw(error.json());
        });
    }

    private callWeatherApi(): Observable<any>{
        let _unitStr =  UnitTypeEnum[this.unitListener.getValue()];
        let _url = 'http://api.openweathermap.org/data/2.5/forecast/daily?appid=87232dad7a32939d0de2bfe4f97d1c92';
        _url = _url.concat(this.turnLocToUrlPart()); // add location param to url (exp: &lat=23&lon=20)
        _url = _url.concat('&units=' + _unitStr); // add unit param to url (exp: &units=metric)
        return this.http.get(_url)
        .map((response:Response) => response.json())
        .catch(error => {
            console.log(error);
            return Observable.throw(error.json());
        });        
    }
    
    private updateCurrentWeather(_apiData){
        let _tempValue = Math.round(_apiData.list[0].temp.day);        
        let _tempIconLink = "http://openweathermap.org/img/w/" + _apiData.list[0].weather[0].icon + ".png";
        
        let _otherParamValues: number[] = []; 
        let _maxTemp =  Math.round(_apiData.list[0].temp.max);
        _otherParamValues.push(_maxTemp);        
        let _minTemp =  Math.round(_apiData.list[0].temp.min);
        _otherParamValues.push(_minTemp);        
        let _humidity = Math.round(_apiData.list[0].humidity);
        _otherParamValues.push(_humidity);        
        let _speed = _apiData.list[0].speed;
        _otherParamValues.push(_speed);        
        let _pressure = Math.round(_apiData.list[0].pressure);
        _otherParamValues.push(_pressure);
        
        this.currentWeatherListener.next(new MCurrentWeather(_tempValue, _tempIconLink, _otherParamValues));
    }

    private updateForecastWeatherData(_apiData){
        let _iconLinks: string[] = [];
        let _tempValues: number[] = [];
        for(var i=0; i<5; i++){
            let _day = Math.round(_apiData.list[i].temp.day);
            _tempValues.push(_day);
            let _icon =  "http://openweathermap.org/img/w/" + _apiData.list[i].weather[0].icon + ".png";
            _iconLinks.push(_icon);
        }
        this.forecastWeatherListener.next(new MForecastWeather(_iconLinks, _tempValues));
    }

    private turnLocToUrlPart(){
        var result = this.geolocationListener.getValue().lonAndLat.replace(',', '&lon=');
        result = ('&lat=').concat(result);
        return result; // example: '&lat=23&lon=-120'
    }

    // END: PRIVATE METHODS ----------------------------------------------------------------

}
