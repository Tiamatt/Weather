import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../../shared/weather-api.service';
import { UnitTypeEnum } from '../../shared/Enums/UnitTypeEnum.enum';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.css']
})
export class SwitcherComponent implements OnInit {
  selectedUnitStr: string;

  constructor(private weatherApiService: WeatherApiService) { }

  ngOnInit() {
    // default value
    this.selectedUnitStr = UnitTypeEnum[this.weatherApiService.unitListener.getValue()];
  }

  onSwitchUnit(_selectedUnitStr:string){
    this.selectedUnitStr = _selectedUnitStr;
    let _unit: UnitTypeEnum = (_selectedUnitStr == 'metric')? UnitTypeEnum.metric: UnitTypeEnum.imperial;
    this.weatherApiService.unitListener.next(_unit)
    this.weatherApiService.getWeatherData();
  }

}
