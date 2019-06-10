import axios from 'axios';
import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

let companies = [];
const getSuggestions = value => {
    console.log(value.value);
    const inputValue = value.value.trim().toLowerCase();
    const inputLength = inputValue.length;
    
    return inputLength === 0 ? [] : companies.filter(comp =>
        comp.name.toLowerCase().slice(0, inputLength) === inputValue
    );
    
   /*
    let results = inputLength === 0 ? [] : companies.filter(comp =>
        comp.name.toLowerCase().slice(0, inputLength) === inputValue
    );
    console.log(results);
    if(results[0].name === inputValue) {
        // change hq_location, phone, and website to reflect chosen company
        document.getElementById('hq_location').value = results[0].hq_location;
        document.getElementById('phone').value = results[0].phone;
        document.getElementById('website').value = results[0].website;
    }
    return results;
    */
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);

class InputCompany extends React.Component {
    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: [],
            selected: ''
        }
        // do something about enter key? it's posting instead of selecting
        // may need popper.js
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        axios.get('/api/companies').then(response => {
            companies = response.data;
        });
    }
    onChange(event, newValue) {
        console.log(newValue);
        this.setState({
            value: newValue.newValue
        });
        if(this.state.selected != null && this.state.selected != newValue.newValue) {
            document.getElementById('hq_location').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('website').value = '';
        }
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
        console.log('suggestion selected!', suggestion);
        this.setState({
            selected: suggestion
        });
        document.getElementById('hq_location').value = suggestion.hq_location;
        document.getElementById('phone').value = suggestion.phone;
        document.getElementById('website').value = suggestion.website;
    }

    render() {
        const { value, suggestions } = this.state;

        const inputProps = {
            value,
            onChange: this.onChange,
            className: 'form-control'
        };

        return (
            <div className='company-input'>
                <div className='form-group'>
                    <label htmlFor='company'>Company</label>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        onSuggestionSelected={this.onSuggestionSelected}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    />
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <label htmlFor='hq_location'>Headquarters Location</label>
                            <input 
                                type='text'
                                className='form-control'
                                id='hq_location'
                                name='hq_location'
                                placeholder='City, State'
                            />
                        </div>
                    </div>
                    <div className='col-md-5'>
                        <div className='form-group'>
                            <label htmlFor='website'>Website</label>
                            <input 
                                type='text'
                                className='form-control'
                                id='website'
                                name='website'
                                placeholder='company.co'
                            />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3'>
                        <div className='form-group'>
                            <label htmlFor='phone'>Phone Number</label>
                            <input 
                                type='text'
                                className='form-control'
                                id='phone'
                                name='phone'
                                placeholder='123-456-7890'
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InputCompany;