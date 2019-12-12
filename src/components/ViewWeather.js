import React from "react";
import SearchCity from "./SearchCity";
import axios from 'axios';

class ViewWeather extends React.Component {

    state = {
        cityName: '',
        time: '',
        cityLatitude: '',
        cityLongitude: '',
        currentTemp: '',
        dayMinTemp: '',
        dayMaxTemp: '',
        currentHumidity: '',
        currentPressure: '',
        currentWind: '',
        currentRainfall: '',
        isIncorrectCity: false,
        isLoading: false,
        isWeatherData: false
    };

    getCityWeatherData = (receivedCity) => {
        this.setState({
            isLoading: true
        });
        axios.post(`http://api.openweathermap.org/data/2.5/weather?q=` + receivedCity + `&appid=05508bb378ad891b493b0c886cca7a57&units=metric`)
            .then(res => res.data).then(data => {
            console.log(data);
            this.processMain(data.main);
            this.processCoord(data.coord);
            this.processWind(data.wind);
            this.processRain(data.weather[0]);
            this.processTime(data);

            this.setState({
                cityName: receivedCity,
                isIncorrectCity: false,
                isLoading: false,
                isWeatherData: true
            });
        }).catch(reason => {
            this.setState({
                isIncorrectCity: true,
                isLoading: false,
                isWeatherData: true
            });
            console.log(reason);
        });
    };

    processMain = (data) => {
        if (data !== null && typeof data !== 'undefined') {
            this.setState({
                currentTemp: data.temp,
                dayMinTemp: data.temp_min,
                dayMaxTemp: data.temp_max,
                currentHumidity: data.humidity + '%',
                currentPressure: data.pressure + 'hPa',
            });
            console.log('Set main');
        }
    };

    processCoord = (data) => {
        if (data !== null && typeof data !== 'undefined') {
            this.setState({
                cityLatitude: data.lat,
                cityLongitude: data.lon,
            });
            console.log('Set coordinates');
        }
    };

    processWind = (data) => {
        if (data !== null && typeof data !== 'undefined') {
            this.setState({
                currentWind: data.speed + 'm/s',
            });
            console.log('Set wind');
        }
    };

    processRain = (data) => {
        if (data !== null && typeof data !== 'undefined') {
            this.setState({
                currentRainfall: data.description,
            });
            console.log('Set rain');
        }
    };

    processTime = (data) => {
        if (data !== null && typeof data !== 'undefined') {
            let timeInMilisec = data.dt;
            let date = new Date(timeInMilisec * 1000);
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let year = date.getFullYear();
            let month = months[date.getMonth()];
            let day = date.getDate();
            let hours = date.getHours();
            let minutes = "0" + date.getMinutes();
            let seconds = "0" + date.getSeconds();
            let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            let time = day + ' ' + month + ' ' + year + ' ' + formattedTime;
            this.setState({
                time: time,
            });
            console.log('Set time');
        }
    };

    render() {
        const {isLoading, isIncorrectCity} = this.state;
        if (isIncorrectCity && !isLoading) {
            return (
                <section>
                    <div className='container'>
                        <SearchCity getCityWeather={this.getCityWeatherData}/>
                        <div className='alert-danger text-center'>Entered City is incorrect!</div>
                    </div>
                </section>
            )
        } else if (isLoading) {
            return (
                <section>
                    <div className='container'>
                        <div className='alert-info text-center'>Loading</div>
                    </div>
                </section>
            )
        } else {
            return (
                <section>
                    <div className='container'>
                        <SearchCity getCityWeather={this.getCityWeatherData}/>
                        <div className='text'>
                            <div className={[this.state.isWeatherData ? 'visible' : 'invisible']}>
                                <div className='text-center-city'>City name: {this.state.cityName}</div>
                                <br/>
                                <div className='text-center-date'>Data downloaded at: {this.state.time}</div>
                                <br/>
                                <div className="row">
                                    <div className="col-sm text-center">
                                        City latitude: {this.state.cityLatitude}
                                    </div>
                                    <div className="col-sm text-center">
                                        City longitude: {this.state.cityLongitude}
                                    </div>
                                    <div className="col-sm text-center">
                                        City currentRainfall: {this.state.currentRainfall}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm text-center">
                                        City current temp: {this.state.currentTemp} &deg;C
                                    </div>
                                    <div className="col-sm text-center">
                                        City day min temp: {this.state.dayMinTemp} &deg;C
                                    </div>
                                    <div className="col-sm text-center">
                                        City day max temp: {this.state.dayMaxTemp} &deg;C
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm text-center">
                                        City currentHumidity: {this.state.currentHumidity}
                                    </div>
                                    <div className="col-sm text-center">
                                        City currentPressure: {this.state.currentPressure}
                                    </div>
                                    <div className="col-sm text-center">
                                        City currentWind: {this.state.currentWind}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
    }
}

export default ViewWeather;