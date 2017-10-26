import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { WeatherApiService } from '../shared/weather-api.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})

export class CurrentWeatherComponent implements OnInit {
  dateTimeNow: any;
  geolocation: any;
  todayWeatherData: any;
  forecastWeatherData: any;
  selectedUnitType: any;

  constructor(private weatherApiService: WeatherApiService) { }

  ngOnInit() {
    // call today date
    this.getDateTimeNow();
    // oF or oC (icon after huge temp number) and unit
    this.selectedUnitType = this.weatherApiService.selectedUnitType;
    // get default values
    this.geolocation = this.weatherApiService.geolocation;
    // get default values  
    this.todayWeatherData = this.weatherApiService.todayWeatherData;
    // call geolocation API (if will call weather API inside) 
    this.weatherApiService.getGeolocationApi();
    // listen for updates
    this.onListenToGeolocation();
    this.onListenToTodayWeatherData();
    this.onListenToSelectedUnitType();
  }
  
  // get date and time, update each second
  getDateTimeNow(){
    setInterval(() => {
        this.dateTimeNow =  new Date();
     }, 1000);
  }

  // resfresh this.geolocation when it is updated
  onListenToGeolocation(){
    this.weatherApiService.listenToGeolocation.subscribe(
      (_response) => this.geolocation = _response
    );
  }

   // resfresh this.todayWeatherData when it is updated
  onListenToTodayWeatherData(){
    this.weatherApiService.listenToTodayWeatherData.subscribe(
      (_response) => this.todayWeatherData = _response
    );
  }

  onListenToSelectedUnitType(){
    this.weatherApiService.listenToSelectedUnitType.subscribe(
      (_response) => this.selectedUnitType = _response
    );
  }


}
