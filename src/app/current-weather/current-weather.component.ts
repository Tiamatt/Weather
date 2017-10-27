import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { WeatherApiService } from '../shared/weather-api.service';
import { MGeolocation } from '../shared/Models/MGeolocation.class';
import { MTodayWeather } from '../shared/Models/MTodayWeather.class';
import { MUnitType } from '../shared/Models/MUnitType.class';
import { UnitTypeEnum } from '../shared/Enums/UnitTypeEnum.enum';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})

export class CurrentWeatherComponent implements OnInit {
  dateTimeNow: Date;
  geolocation: MGeolocation;
  todayWeatherData: MTodayWeather;
  unitType: MUnitType;
  
  constructor(private weatherApiService: WeatherApiService) { }

  readonly paramName = MTodayWeather.paramName;
  readonly iconLinks = MTodayWeather.iconLinks;

  ngOnInit() {
    // call today's date and time with refreshing each 1s
    this.getDateTimeClocking();

    this.weatherApiService.geolocationListener.subscribe(
      (_response: MGeolocation) => this.geolocation  = _response
    );

    this.weatherApiService.todayWeatherListener.subscribe(
      (_response: MTodayWeather) => this.todayWeatherData  = _response
    );
    
    this.unitType = MUnitType.getData(UnitTypeEnum.metric);

    // kali
    //this.geolocation = this.weatherApiService.geolocationListener.getValue();
    //this.todayWeatherData = this.weatherApiService.todayWeatherListener.getValue();
  }
  
  // get date and time, update each second
  private getDateTimeClocking():void{
    setInterval(() => {
        this.dateTimeNow =  new Date();
     }, 1000);
  }

}
