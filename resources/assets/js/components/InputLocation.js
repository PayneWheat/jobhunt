import axios from 'axios';
import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

let locations = [];
const getSuggestions = value => {
    console.log(value.value);
    const inputValue = value.value.trim().toLowerCase();
    const inputLength = inputValue.length;
    
    return inputLength === 0 ? [] : locations.filter(loc =>
        loc.city.toLowerCase().slice(0, inputLength) === inputValue
    );
};

const getSuggestionValue = suggestion => suggestion.city;

const renderSuggestion = suggestion => (
    <div>
        {suggestion.city}, {suggestion.state}
    </div>
);

class InputLocation extends React.Component {
    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: [],
            selected: '',
            show_location_button: false,
            show_location_check: false
        }
        // do something about enter key? it's posting instead of selecting
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.addLocation = this.addLocation.bind(this);
        var that = this;
        axios.get('/api/locations').then(response => {
            locations = response.data;
            console.log(locations);
        });
    }
    onChange(event, newValue) {
        console.log(newValue);
        console.log("onChange. props:", this.props);
        this.setState({
            value: newValue.newValue,
            show_location_check: false
        });
       // check for a comma
       if(newValue.newValue.search(",") != -1) {
           let splitValue = newValue.newValue.split(",");
           console.log(splitValue[0], splitValue[1]);
           this.setState({
               show_location_button: true
           });
       } else {
            this.setState({
                show_location_button: false
            });
       }
       // add every state to suggestion list? 
       // convert abbreviation to whole word?

       // eventually validate format
    }
    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested(value) {
        console.log("Fetch requested");
        this.setState({
            suggestions: getSuggestions(value)
        });
    }
    
    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested() {
        this.setState({
            suggestions: [],
        });
        
    }

    onSuggestionSelected(event, { suggestion }) {
        console.log("Suggestion selected.");
        document.getElementById(this.props.locationFieldId).value = suggestion.id;
        this.setState({
            selected: suggestion,
            value: suggestion.city + ", " + suggestion.state,
            show_location_check: true
        }, ()=>{this.props.action(suggestion.id);});
        //document.getElementById('city').value = suggestion.city;
        // set hidden field value to suggestion.id
        
    }

    addLocation(event) {
        event.preventDefault();
        console.log("Now add to db: " + this.state.value);
        let splitValue = this.state.value.split(",").map((item) => item.trim());
        console.log(splitValue[0]);
        console.log(splitValue[1]);
        this.setState({
            show_location_button: false
        });
        axios.post('/api/locations', {
            city: splitValue[0],
            state: splitValue[1]
        }).then(function(response) {
            console.log("success, response", response);
            /*
            this.setState({
                show_location_check: true
            });
            */
           // add response id to action
           this.props.action(response.data.id);
           this.setState({
               show_location_check: true
           });
           //document.getElementById("location_check").classList.remove('hidden');
        }.bind(this)).catch(function(error){
            // error adding location
            console.log("error", error);
        });
        
    }

    render() {
        const { value, suggestions } = this.state;

        const inputProps = {
            value,
            onChange: this.onChange,
            className: 'form-control',
            placeholder: 'City, State',
            id: this.props.id
        };

        return (
            <div id='location_input'>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    onSuggestionSelected={this.onSuggestionSelected}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                    key={this.props.value}
                    id='job_location'
                />
                
                <button 
                    id='add_location'
                    className={this.state.show_location_button ? 'btn btn-secondary btn-sm floater' : 'btn btn-secondary btn-sm hidden floater'}
                    onClick={this.addLocation}
                >
                    Add
                </button>
                <i id='location_check' className={this.state.show_location_check ? 'fas fa-check floater' : 'fas fa-check floater hidden'}></i>
            </div>
        )
    }
}

export default InputLocation;