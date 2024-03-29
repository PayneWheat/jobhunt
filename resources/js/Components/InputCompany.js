import axios from 'axios';
import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import Input from './Input';
import Label from './Label';

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
        super(props);
        console.log("InputCompany props", props);
        this.state = {
            company_id: props.companyId || null,
            value: props.companyName || '',
            suggestions: [],
            selected: '',
            city: '',
            state: '',
            website: props.companyWebsite || '',
            phone: props.companyPhone || '',
            show_add_button: false,
            show_check: !!props.companyId,
            readonly_addtl_fields: false,
            override_readonly: props.readOnlyFields || false,
            is_loading: true,
        }

        if(props.companyId) {
            props.action(props.companyId);
        }

        // do something about enter key? it's posting instead of selecting
        this.onChange = this.onChange.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.addCompany = this.addCompany.bind(this);
    }

    onChange(event, newValue) {
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
        console.log("InputCompany mount:", this.state)
        axios.get('/api/companies').then(response => {
            this.setState({
                companies: response.data,
                is_loading: false
            });
        });
        if(this.state.value != '') {
            this.setState({
                readonly_addtl_fields: true
            });
        }
    }
    componentDidUpdate() {
        console.log("InputCompany update", this.state);
    }
    // add handler
    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        }, ()=>{
            if(this.state.value != '' && this.state.website != '') {
                this.setState({
                    show_add_button: true
                });
            } else {
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
        }, () => this.props.action(suggestion.id));

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

    render() {
        const { value, suggestions, is_loading } = this.state;
        const inputProps = {
            value: this.state.value,
            onChange: this.onChangeName,
            className: this.props.className
        };

        return (
            
            <div>
            {!is_loading ? (
                <div>
                    <div>
                        <Label htmlFor='company'>Company</Label>
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            onSuggestionSelected={this.onSuggestionSelected}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                            value={value}
                        />
                        {this.state.show_add_button ? (
                            <button 
                                id='add_company'
                                className={this.state.show_add_button ? 'btn btn-secondary btn-sm floater' : 'btn btn-secondary btn-sm hidden floater'}
                                onClick={this.addCompany}
                            >
                                Add
                            </button>
                        ) : null}

                        {this.state.show_check ? (
                            <i id='company_check' className={this.state.show_check ? 'fas fa-check floater' : 'fas fa-check floater hidden'}></i>
                        ) : null}
                    </div>
                    <div className="flex flex-row flex-wrap">
                        <div className="basis-full mt-4 sm:mr-2 sm:basis-1/3">
                            <Label htmlFor='website'>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                placeholder="company.com"
                                className="mt-1 block w-full"
                                handleChange={this.handleFieldChange}
                                value={this.state.website}
                                readOnly={(!this.state.override_readonly && this.state.readonly_addtl_fields)}
                            />
                        </div>
                        <div className="basis mt-4 sm:ml-2 sm:basis-1/5">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input 
                                type="text"
                                className="mt-1 block w-full"
                                name="phone"
                                placeholder="123-456-7890"
                                handleChange={this.handleFieldChange}
                                value={this.state.phone}
                                readOnly={(!this.state.override_readonly && this.state.readonly_addtl_fields)}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <h3>loading</h3>
            )}  
            </div>
        )
    }
}

export default InputCompany;