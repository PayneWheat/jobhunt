import axios from 'axios';
import React, { Component } from 'react';
//import Select from 'react-select';
//import Autosuggest from 'react-autosuggest';
import InputCompany from './InputCompany';
import InputLocation from './InputLocation';

const getCompanySuggestionValue = suggestion => suggestion.name;
class NewInterview extends Component {
    constructor() {
        super();
        this.state = {
            is_loading: true,
            application: {},
            types: [],
            interview_type: '',
            interview_datetime: null,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        /*
        axios.get('/api/locations').then(response => {
            let locationCities = [];
            response.data.map(city => {
                locationCities.push(city)
            });
            this.setState({
                location_options: locationCities
            });
            this.setState({
                locations: response.data
            });
        });
        */
    }
    componentDidMount() {
        const app_id = this.props.match.params.id;
        axios.get('/api/applications/' + app_id).then(response=> {
            console.log("RESPONSE:", response);
            this.setState({
                is_loading: false,
                application: response.data
            });
            console.log("application:", this.state.application);
        });
        axios.get('/api/interviews/types').then(response=>{
            console.log("RESPONSE (types):", response);
            this.setState({
                types: response.data
            });
        });
    }
    onSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        let curType = this.state.types.filter(type => {
            return type.type == this.state.interview_type;
        })[0];
        let typeId = curType.id;
        console.log("curType", curType, typeId);
        const interview = {
            at_time: this.state.interview_datetime,
            interview_type_id: typeId,
            application_id: this.state.application.id,
        }
        console.log("Form submitted", interview);
        axios.post('/api/interviews/', interview).then(response=>{
            console.log(response);
            return response;
        });
    }
    handleFieldChange(event) {
        console.log(event.target.name, event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        }, ()=>{console.log("STATE", this.state)});
    }
    render() {
        const { is_loading, types } = this.state;
        return (
            <div className='container'>
            {!is_loading ? (
                <form onSubmit={this.onSubmit}>
                    <div>
                        <div>New interview for {this.state.application.position} at {this.state.application.company.name}</div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='interview-type'>Interview Type</label>
                        {types ? (
                            <select 
                                className='form-control' 
                                name='interview_type'
                                defaultValue={this.state.interview_type}
                                onChange={this.handleFieldChange}
                            >
                                <option disabled value=''>Choose a type</option>
                                {types.map(type=>(
                                    <option key={type.id}>{type.type}</option>
                                ))}
                            </select>
                        ) : (
                            <select readOnly="true"><option>Loading</option></select>
                        )}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='interview-type'>Interview Date and Time</label>
                        <input 
                            className='form-control' 
                            name='interview_datetime' 
                            type='datetime-local'
                            defaultValue={this.state.interview_datetime}
                            onChange={this.handleFieldChange}
                        />
                    </div>
                    {this.state.interview_type == "On-site" ? (
                        <div>
                            <label>Address (optional)</label>
                            <div className='form-group'>
                                <input
                                    className='form-control' 
                                    name='interview_address1' 
                                    type='text'
                                    placeholder='Street Address 1'
                                    defaultValue={this.state.interview_address1}
                                    onChange={this.handleFieldChange}
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    className='form-control' 
                                    name='interview_address2' 
                                    type='text'
                                    placeholder='Street Address 2'
                                    defaultValue={this.state.interview_address2}
                                    onChange={this.handleFieldChange}
                                />
                            </div>
                            <div className='form-group'>
                                <InputLocation />
                            </div>
                            <div className='form-group'>
                                <input
                                    className='form-control' 
                                    name='interview_zip' 
                                    type='text'
                                    placeholder='Zip Code'
                                    defaultValue={this.state.interview_address}
                                    onChange={this.handleFieldChange}
                                />
                            </div>
                        </div>
                    ) : null
                    }
                    <input className='btn btn-primary' value='Submit' type='submit'/>
                </form>
                ) : (
                <h3>loading</h3>
                )}
            </div>
        );
    }
}

export default NewInterview;
