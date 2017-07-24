import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'; // need for WeatherApiService
// services
import { WeatherApiService } from './shared/weather-api.service';
import { WeatherInfoService } from './shared/weather-info.service';
// components
import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ForecastWeatherComponent } from './forecast-weather/forecast-weather.component';
import { FooterComponent } from './footer/footer.component';
import { SwitcherComponent } from './forecast-weather/switcher/switcher.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    ForecastWeatherComponent,
    FooterComponent,
    SwitcherComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [WeatherApiService, WeatherInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
