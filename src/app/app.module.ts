import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; // need for WeatherApiService
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete'; // need for LocationSearchComponent
// services
import { WeatherApiService } from './shared/weather-api.service';
// components
import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ForecastWeatherComponent } from './forecast-weather/forecast-weather.component';
import { FooterComponent } from './footer/footer.component';
import { SwitcherComponent } from './forecast-weather/switcher/switcher.component';
import { LocationSearchComponent } from './forecast-weather/location-search/location-search.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    ForecastWeatherComponent,
    FooterComponent,
    SwitcherComponent,
    LocationSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpModule, 
    FormsModule,
    Ng4GeoautocompleteModule.forRoot() // need for LocationSearchComponent
  ],
  providers: [WeatherApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
