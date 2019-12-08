import axios from 'axios';
import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import InputLocation from './InputLocation';

let companies = [];
const getSuggestions = value => {
    console.log(value.value);
    const inputValue = value.value.trim().toLowerCase();
    const inputLength = inputValue.length;
    
    return inputLength === 0 ? [] : companies.filter(comp =>
        comp.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);

class InputCompany extends React.Component {
    constructor(props) {
        super();
        this.state = {
            value: props.companyName || '',
            suggestions: [],
            selected: '',
            city: '',
            state: '',
            website: props.companyWebsite || '',
            phone: props.companyPhone || '',
            /*company_name: props.companyName || '',*/
            show_add_button: false,
            show_check: false,
            readonly_addtl_fields: false,
            override_readonly: props.readOnlyFields || false
        }

        // do something about enter key? it's posting instead of selecting
        this.onChange = this.onChange.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.addCompany = this.addCompany.bind(this);
        console.log("InputCompany props", props);
        axios.get('/api/companies').then(response => {
            companies = response.data;
        });
    }
    onChange(event, newValue) {
        console.log("InputCompany::onChange newValue", event, newValue);
        this.setState({
            value: newValue.newValue
        });
        if(this.state.selected != null && this.state.selected != newValue.newValue) {
           this.setState({
               phone: '',
               website: ''
           })
        }

    }
    onChangeName(event, newValue) {
        console.log("InputCompany::onChangeName newValue", event, newValue);
        if(this.state.readonly_addtl_fields && !this.state.override_readonly) {
            this.setState({
                readonly_addtl_fields: false,
                website: '',
                phone: ''
            })
        }
        this.setState({
            value: newValue.newValue,
            show_add_button: true
        });
    }
    componentDidMount() {
        if(this.state.value != '') {
            this.setState({
                readonly_addtl_fields: true
            });
        }
    }
    // add handler
    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        }, ()=>{
            if(this.state.value != '' && this.state.website != '') {
                console.log("truthy");
                this.setState({
                    show_add_button: true
                }, ()=>{console.log(this.state);});
            } else {
                console.log("falsey");
                this.setState({
                    show_add_button: false,
                    show_check: false
                });
            }
        });
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
            selected: suggestion,
            show_add_button: false,
            website: suggestion.website,
            phone: suggestion.phone,
            show_check: true
        }, ()=>{this.props.action(suggestion.id);});

    }

    addCompany(event) {
        event.preventDefault();
        this.setState({
            show_add_button: false
        });
        axios.post('/api/companies', {
            name: this.state.value,
            phone: this.state.phone,
            website: this.state.website
        }).then(function(response) {
            console.log("Response.id: " + response.data.id);
            this.props.action(response.data.id);
            this.setState({
                show_check: true
            });
        }.bind(this)).catch(function(error) {
            console.log(error);
        });
    }
    handlePhoneFieldChange(event) {
        
    }
    render() {
        const { value, suggestions } = this.state;
        console.log("rendering InputCompany", this.props, this.state);
        const inputProps = {
            value: this.state.value,
            onChange: this.onChangeName,
            className: 'form-control'
        };

        return (
            <div className='company-input'>
                <div className='form-group rel-pos'>
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
                    <button 
                        id='add_company'
                        className={this.state.show_add_button ? 'btn btn-secondary btn-sm floater' : 'btn btn-secondary btn-sm hidden floater'}
                        onClick={this.addCompany}
                    >
                        Add
                    </button>
                    <i id='company_check' className={this.state.show_check ? 'fas fa-check floater' : 'fas fa-check floater hidden'}></i>
                </div>
                <div className='row'>
                    <div className='col-md-5'>
                        <div className='form-group'>
                            <label htmlFor='website'>Website</label>
                            <input 
                                type='text'
                                className='form-control'
                                id='website'
                                name='website'
                                placeholder='company.co'
                                value={this.state.website}
                                readOnly={(!this.state.override_readonly && this.state.readonly_addtl_fields)}
                                onChange={this.handleFieldChange}
                            />
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div className='form-group'>
                            <label htmlFor='phone'>Phone Number</label>
                            <input 
                                type='text'
                                className='form-control'
                                id='phone'
                                name='phone'
                                placeholder='123-456-7890'
                                value={this.state.phone}
                                readOnly={(!this.state.override_readonly && this.state.readonly_addtl_fields)}
                                onChange={this.handlePhoneFieldChange}
                            />

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InputCompany;