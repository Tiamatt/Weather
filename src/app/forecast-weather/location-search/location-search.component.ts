import { Component, OnInit} from '@angular/core';
import { WeatherApiService } from '../../shared/weather-api.service';
import { MGeolocation } from '../../shared/Models/MGeolocation.class';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.css']
})
export class LocationSearchComponent implements OnInit {

  constructor(private weatherApiService: WeatherApiService) { }

  ngOnInit() {}

  autoCompleteCallback1(selectedData:any) {
    let _lat = selectedData.geometry.location.lat;
    let _lng = selectedData.geometry.location.lng;
    let _formatted_address = selectedData.formatted_address;

    if(_lat && _lng && _formatted_address)
    {
      let _geolocation : MGeolocation = new MGeolocation(
        _formatted_address,
        _lat+','+_lng
      );
      this.weatherApiService.geolocationListener.next(_geolocation);
      this.weatherApiService.getWeatherData();
    }
    else
      alert('Upps! Failed to get searched location');
  }

}
