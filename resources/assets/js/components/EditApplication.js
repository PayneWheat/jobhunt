import axios from 'axios';
import React, { Component } from 'react';
//import Select from 'react-select';
//import Autosuggest from 'react-autosuggest';
import InputCompany from './InputCompany';
import InputLocation from './InputLocation';

const getCompanySuggestionValue = suggestion => suggestion.name;
class EditApplication extends Component {
    constructor() {
        super();
        this.state = {
            position: '',
            company_id: '',
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
            requested_salary: '',
            post_age: '',
            app_id: ''
        }
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreateNewApplication = this.handleCreateNewApplication.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.setCompanyId = this.setCompanyId.bind(this);
        this.setLocationId = this.setLocationId.bind(this);
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
        console.log("Edit application constructor completed.");
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({
            app_id: id
        });
        axios.get('/api/applications/' + id).then(response => {
            console.log(response);
            this.setState({
                position: response.data.position,
                company_id: response.data.company_id,
                company_name: response.data.company_name,
                location_id: response.data.location_id,
                job_description: response.data.job_description,
                post_age: response.data.post_age,
                requested_salary: response.data.requested_salary,
                posted_salary_min: response.data.posted_salary_min,
                posted_salary_max: response.data.posted_salary_max,
                resume_text: response.data.resume_text,
                coverletter_text: response.data.coverletter_text
            });
        });
        console.log("Edit application componentDidMount completed.");
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
            requested_salary: this.state.requested_salary,
            post_age: this.state.post_age
        }
        console.log(application);
        
        axios.post('/api/applications', application).then(response => {
            history.push('/');
        })
        .catch(error => {
            console.log(error);
            this.setState({
                errors: error.response.data.errors
            });
        })
        
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
        //console.log("Setting company id: " + id);
        this.setState({
            company_id: id
        });
    }
    setLocationId(id) {
        //console.log(id);
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
                        <div>Create new application</div>
                    
                        <form onSubmit={this.handleCreateNewApplication}>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label htmlFor='position'>Position</label>
                                        <input
                                            id='position'
                                            type='text'
                                            /*className={`form-control ${this.hasErrorFor('position') ? 'is-invalid' : ''}`}*/
                                            className='form-control'
                                            name='position'
                                            value={this.state.position}
                                            onChange={this.handleFieldChange}
                                        />
                                        {/*this.renderErrorFor('position')*/}
                                    </div>
                                </div>
                                <div className='col-md-5'>
                                    <div className='form-group'>
                                        <label htmlFor='app_location'>Job Location</label>
                                        <InputLocation
                                            stateFieldId='app_state'
                                            cityFieldId='app_city'
                                            locationFieldId='app_location_id'
                                            id='app_location'
                                            name='app_state'
                                            /*className={`form-control ${this.hasErrorFor('app_location') ? 'is-invalid' : ''}`}*/
                                            className='form-control'
                                            action={this.setLocationId}
                                        />
                                        {/*this.renderErrorFor('app_location')*/}
                                    </div>
                                </div>
                            </div>
                            
                            <InputCompany action={this.setCompanyId}/>
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
                                <div className='col-md-6'>
                                    <label htmlFor='post_age'>Age of Job Posting (days)</label>
                                    <div className='form-group no-gutters col-md-6'>
                                        <input 
                                            id='post_age'
                                            type='number'
                                            name='post_age'
                                            className='form-control'
                                            onChange={this.handleFieldChange}
                                            value={this.state.post_age}
                                        />
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <label htmlFor='requested_salary'>Requested Salary (optional)</label>
                                    <div className='form-group no-gutters col-md-8'>
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
                            <button className='btn btn-primary'>Create Application</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditApplication;
