import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../../shared/weather-api.service';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.css']
})
export class SwitcherComponent implements OnInit {
  selectedUnit: string = 'metric';
  constructor(private weatherApiService: WeatherApiService) { }

  ngOnInit() {
  }

  // onSwitchUnit(_unit:string){
  //   this.selectedUnit = _unit;
  //   this.weatherApiService.getWeatherApi(_unit);
  // }

}
