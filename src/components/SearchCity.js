import React from "react";

class SearchCity extends React.Component {

    state = {
        cityName: '',
    };

    handleChange = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.passData(this.state.cityName);
    };

    passData = (data) => {
        console.log('PassData ' + data)
        this.props.getCityWeather(data);
    };

    render() {
        const {cityName} = this.state;
        return (
            <section>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <h2>Enter City Name:</h2> <br/>
                        <input className="city-input" type='text' name='cityName' value={cityName}
                               onChange={this.handleChange}/>
                        <button>Check weather</button>
                    </form>
                </div>
            </section>
        );
    }
}

export default SearchCity;