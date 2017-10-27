import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../shared/weather-api.service';
import { MForecastWeather } from '../shared/Models/MForecastWeather.class';

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.css']
})
export class ForecastWeatherComponent implements OnInit {
  forecastWeather: MForecastWeather;
  readonly weekdays: string[] = MForecastWeather.weekdays;

  constructor(private weatherApiService: WeatherApiService) { }

  ngOnInit() {

    this.weatherApiService.forecastWeatherListener.subscribe(
      (_response: MForecastWeather) => this.forecastWeather = _response
    );
  }

}
