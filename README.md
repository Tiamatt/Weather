# Weather app
This [web application](https://tiamatt.github.io/Weather) provides weather forecast for today and next five days for any selected region in metric and imperial units. Built with Angular and Google API.


## Demo
Live DEMO [here](https://tiamatt.github.io/Weather) </br>
</br>
![WeatherScreenshot](/src/assets/screenshot.png?raw=true "Weather screenshot")


## Features
* Fully responsive design
* Using BehaviorSubject over Subject (Rx observable)


## Built With
* Angular 4 (TypeScript)
* Angular CLI v1.2.2
* Node.js v8.5.0 and npm v5.3.0
* ng4-geoautocomplete (for location autocomplete)
* Google map API (for location autocomplete)
* OpenWeatherMap API (for weather icons)
* IP Address API (for user’s current location)
* Bootstrap v3.3.7
* Google fonts
* Weather Icons v1.3.2


## Getting Started
Note, this project requires Node.js installation.</br>
Follow the steps:
```bash
# step 1. Go to Node.js official website and install it
# check Node.js version (v8.5.0 or upper)
$ node –v
# check npm version (v5.3.0 or upper)
$ npm -v
# step 2. install Angular CLI
$ npm install -g @angular/cli
# check Angular CLI version (v1.4.2 or upper)
$ ng -v
# step 3. import project from github 
$ git clone https://github.com/Tiamatt/Weather
$ cd Weather
# step 4. install the project's dependencies (node_modules folder)
$ npm install
# step 5. run application
$ ng serve
# navigate to `http://localhost:4200/`
# app will automatically reload if you change any of the source files.
```