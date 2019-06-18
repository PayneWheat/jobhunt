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
            selected: ''
        }
        // do something about enter key? it's posting instead of selecting
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        axios.get('/api/locations').then(response => {
            locations = response.data;
            console.log(locations);
        });
    }
    onChange(event, newValue) {
        console.log(newValue);
        console.log("props:", this.props);
        this.setState({
            value: newValue.newValue
        });
       // check for a comma
       if(newValue.newValue.search(",") != -1) {
           let splitValue = newValue.newValue.split();
           console.log(splitValue[0], splitValue[1]);
       }
       // add every state to suggestion list? 
       // convert abbreviation to whole word?

       // eventually validate format
    }
    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested(value) {
        this.setState({
            suggestions: getSuggestions(value)
        });
    }
    
    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        });
    }

    onSuggestionSelected(event, { suggestion }) {
        this.setState({
            selected: suggestion,
            value: suggestion.city + ", " + suggestion.state
        });
        //document.getElementById('city').value = suggestion.city;
        // set hidden field value to suggestion.id
        document.getElementById(this.props.locationFieldId).value = suggestion.id;
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
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                onSuggestionSelected={this.onSuggestionSelected}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                key={this.props.value}
            />
        )
    }
}

export default InputLocation;