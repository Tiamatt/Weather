import { Component, OnInit} from '@angular/core';
import { WeatherApiService } from '../../shared/weather-api.service';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.css']
})
export class LocationSearchComponent implements OnInit {

  constructor(private weatherApiService: WeatherApiService) { }

  ngOnInit() {}

  autoCompleteCallback1(selectedData:any) {
    console.log('autoCompleteCallback1');
    console.log(selectedData);

    let _lat = selectedData.geometry.location.lat;
    let _lng = selectedData.geometry.location.lng;
    let _formatted_address = selectedData.formatted_address;
    
    // let _geolocation = {
    //   city: _formatted_address,
    //   country: '',
    //   loc:_lat+','+_lng
    // };

    // console.log(_geolocation);
    if(_lat !== undefined && _lng !== undefined && _formatted_address !== undefined)
    {
      let _geolocation = {
        city: _formatted_address,
        country: '',
        loc:_lat+','+_lng
      };
      console.log(_geolocation);
      this.weatherApiService.listenToGeolocation.next(_geolocation);
      this.weatherApiService.getGeolocationApi();
    }
    else
      alert('Upps! Failed to get searched location');
  }

}
