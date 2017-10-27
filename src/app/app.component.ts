import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from './shared/weather-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private weatherApiService: WeatherApiService) { }
  ngOnInit(){
    this.weatherApiService.getUsersCurrentLocation();
  }
}
