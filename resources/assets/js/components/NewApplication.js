import axios from 'axios';
import React, { Component } from 'react';
//import Select from 'react-select';
//import Autosuggest from 'react-autosuggest';
import InputCompany from './InputCompany';
import InputLocation from './InputLocation';

const getCompanySuggestionValue = suggestion => suggestion.name;
class NewApplication extends Component {
    constructor() {
        super();
        this.state = {
            position: '',
            company_id: -1,
            company_name: '',
            location_id: '',
            location_name: '',
            errors: [],
            companies: [],
            company_suggestions: [],
            locations: [],
            location_options: [],
            app_state: '',
            app_city: '',
            job_description: '',
            resume_text: '',
            coverletter_text: '',
            posted_salary_min: '',
            posted_salary_max: '',
            requested_salary: ''
        }
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreateNewApplication = this.handleCreateNewApplication.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.setCompanyId = this.setCompanyId.bind(this);
        this.setLocationId = this.setLocationId.bind(this);
        /*
        axios.get('/api/companies').then(response => {
            this.setState({
                companies: response.data
            });
        });
        */
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
    }
    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleCreateNewApplication(event) {
        event.preventDefault();
        const { history } = this.props;

        const application = {
            position: this.state.position,
            company_id: this.state.company_id,
            location_id: this.state.location_id,
            job_description: this.state.job_description,
            resume_text: this.state.resume_text,
            coverletter_text: this.state.coverletter_text,
            posted_salary_min: this.state.posted_salary_min,
            posted_salary_max: this.state.posted_salary_max,
            requested_salary: this.state.requested_salary
        }
        console.log(application);
        /*
        axios.post('/api/applications', application).then(response => {
            history.push('/');
        })
        .catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
        })
        */
    }
    hasErrorFor(field) {
        return !!this.state.errors[field];
    }
    renderErrorFor(field) {
        if(this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            );
        }
    }
    setCompanyId(id) {
        this.setState({
            company_id: id
        });
    }
    setLocationId(id) {
        console.log(id);
        this.setState({
            location_id: id
        });
    }
    render() {
        const { applications } = this.state;
        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>Create new application</div>
                            <div className='card-body'>
                                <form onSubmit={this.handleCreateNewApplication}>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='form-group'>
                                                <label htmlFor='position'>Position</label>
                                                <input
                                                    id='position'
                                                    type='text'
                                                    className={`form-control ${this.hasErrorFor('position') ? 'is-invalid' : ''}`}
                                                    name='position'
                                                    value={this.state.position}
                                                    onChange={this.handleFieldChange}
                                                />
                                                {this.renderErrorFor('position')}
                                            </div>
                                        </div>
                                        <div className='col-md-5'>
                                            <div className='form-group'>
                                                {
                                                    /* Choose location/create new 
                                                <label htmlFor='location_name'>Job Location</label>
                                                <input
                                                    id='location_name'
                                                    type='text'
                                                    className='form-control'
                                                    name='location_name'
                                                    placeholder='City, State'
                                                    value={this.state.location_name}
                                                    onChange={this.handleLocationFieldChange}
                                                />
                                                */}
                                                <label htmlFor='app_location'>Job Location</label>
                                                <InputLocation
                                                    stateFieldId = 'app_state'
                                                    cityFieldId = 'app_city'
                                                    locationFieldId= 'app_location_id'
                                                    id='app_location'
                                                    name='app_state'
                                                    action={this.setLocationId}
                                                />
                                                <input
                                                    id='app_location_id'
                                                    type='hidden'
                                                    name='location_id'
                                                    value={this.state.location_id}
                                                    onChange={this.handleFieldChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <InputCompany action={this.setCompanyId}/>
                                    <input
                                        id='company_id'
                                        type='hidden'
                                        name='company_id'
                                        onChange={this.handleFieldChange}
                                        value={this.state.company_id}
                                    />
                                    <div className='form-group'>
                                        <label htmlFor='resume'>Job Description</label>
                                        <textarea 
                                            id='job_description' 
                                            className='form-control'
                                            name='job_description'
                                            onChange={this.handleFieldChange}
                                            value={this.state.job_description}
                                        />
                                    </div>

                                    <div className='row'>
                                        <div className='col-md-8 no-gutters'>
                                            <label className='no-gutters-label'>Posted Salary Range (optional)</label>
                                            <div className='col-sm-6'>
                                                <div className='form-group'>
                                                    <input
                                                        id='posted_salary_min'
                                                        type='number'
                                                        placeholder='Minimum'
                                                        name='posted_salary_min'
                                                        className='form-control'
                                                        onChange={this.handleFieldChange}
                                                        value={this.state.posted_salary_min}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-sm-6'>
                                                <div className='form-group'>
                                                <input
                                                    id='posted_salary_max'
                                                    type='number'
                                                    placeholder='Maximum'
                                                    name='posted_salary_max'
                                                    className='form-control'
                                                    onChange={this.handleFieldChange}
                                                    value={this.state.posted_salary_max}
                                                />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className='form-group'>
                                                <label htmlFor='requested_salary'>Requested Salary</label>
                                                <input
                                                    id='requested_salary'
                                                    type='number'
                                                    name='requested_salary'
                                                    className='form-control'
                                                    onChange={this.handleFieldChange}
                                                    value={this.state.requested_salary}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='resume_text'>Resume Submitted</label>
                                        <textarea 
                                            id='resume_text' 
                                            className='form-control'
                                            name='resume_text'
                                            onChange={this.handleFieldChange}
                                            value={this.state.resume_text}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='coverletter_text'>Cover Letter Submitted</label>
                                        <textarea 
                                            id='coverletter_text' 
                                            className='form-control'
                                            name='coverletter_text'
                                            onChange={this.handleFieldChange}
                                            value={this.state.coverletter_text}
                                        />
                                    </div>
                                    <button 
                                        className='btn btn-primary'
                                    >
                                    Create Application
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewApplication;
