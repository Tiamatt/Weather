import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../shared/weather-api.service';

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.css']
})
export class ForecastWeatherComponent implements OnInit {
  forecastWeatherData: any;

  constructor(private weatherApiService: WeatherApiService) { }

  ngOnInit() {
    this.forecastWeatherData = this.weatherApiService.forecastWeatherData;
    this.onListenToForecastWeatherData();
  }

  onListenToForecastWeatherData(){
    this.weatherApiService.listenToForecastWeatherData.subscribe(
      (_response) => this.forecastWeatherData = _response
    );
  }

}
