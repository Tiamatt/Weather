import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { WeatherApiService } from '../shared/weather-api.service';
import { MGeolocation } from '../shared/Models/MGeolocation.class';
import { MCurrentWeather } from '../shared/Models/MCurrentWeather.class';
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
  currentWeather: MCurrentWeather;
  unitType: MUnitType;
  readonly paramName = MCurrentWeather.paramName;
  readonly iconLinks = MCurrentWeather.iconLinks;


  constructor(private weatherApiService: WeatherApiService) { }

  ngOnInit() {
    // call today's date and time with refreshing each 1s
    this.getDateTimeClocking();

    this.weatherApiService.geolocationListener.subscribe(
      (_response: MGeolocation) => this.geolocation  = _response
    );

    this.weatherApiService.currentWeatherListener.subscribe(
      (_response: MCurrentWeather) => this.currentWeather  = _response
    );

    this.weatherApiService.unitListener.subscribe(
      (_response: UnitTypeEnum) => this.unitType = MUnitType.getData(_response)
    );
  }
  
  // get date and time, update each second
  private getDateTimeClocking():void{
    setInterval(() => {
        this.dateTimeNow =  new Date();
     }, 1000);
  }

}
