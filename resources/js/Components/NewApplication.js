import axios from 'axios';
import React, { Component } from 'react';
import { Inertia } from '@inertiajs/inertia'
import InputCompany from '@/Components/InputCompany';
import InputLocation from '@/Components/InputLocation';
import Container from 'react-bootstrap/Container';
import Label from './Label';
import Input from './Input';

const getCompanySuggestionValue = suggestion => suggestion.name;
class NewApplication extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: props.userId,
            edit: props.edit || false,
            position: '',
            company_id: props.companyId || '',
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
            app_zip: '',
            job_description: '',
            resume_text: undefined,
            coverletter_text: undefined,
            posted_salary_min: '',
            posted_salary_max: '',
            requested_salary: '',
            post_age: '',
            app_id: props.app_id || null,
            is_loading: true
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    }

    componentDidMount() {
        if(this.state.edit) {
            axios.get('/api/applications/' + this.state.app_id).then(response => {
                const locValue = response.data.location.city + ", " + response.data.location.state;
                let dt = new Date(response.data.created_at).toISOString();
                dt = dt.substring(0, dt.length - 1);
                this.setState({
                    user_id: response.data.user_id,
                    position: response.data.position,
                    company: response.data.company,
                    location_id: response.data.location_id,
                    location_value: locValue,
                    app_zip: response.data.app_zip || '',
                    job_description: response.data.job_description,
                    post_age: response.data.post_age,
                    requested_salary: response.data.requested_salary,
                    posted_salary_min: response.data.posted_salary_min,
                    posted_salary_max: response.data.posted_salary_max,
                    resume_text: response.data.resume_text,
                    coverletter_text: response.data.coverletter_text,
                    created_at: response.data.created_at,
                    applied_at: response.data.applied_at,
                    is_loading: false
                });
            });
        } else {
            this.setState({
                is_loading: false
            })
        }
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const application = {
            position: this.state.position,
            company_id: this.state.company_id,
            location_id: this.state.location_id,
            app_zip: this.state.app_zip,
            job_description: this.state.job_description,
            resume_text: this.state.resume_text,
            coverletter_text: this.state.coverletter_text,
            posted_salary_min: this.state.posted_salary_min,
            posted_salary_max: this.state.posted_salary_max,
            requested_salary: this.state.requested_salary,
            post_age: this.state.post_age,
            user_id: this.state.user_id
        }
        console.log('NewApplication::handleSubmit', this.state, application);

        if (!this.state.edit) {
            axios.post('/api/applications', application).then(response => {
                Inertia.visit('/application/' + response.data.id);
            }).catch(error => {
                //@TODO handle when error.response.data.errors does not exist
                this.setState({
                    errors: error.response.data.errors
                });
            });
        } else {
            axios.put('/api/applications/' + this.state.app_id, application).then(response => {
                Inertia.visit('/application/' + response.data.id);
            }).catch(error => {
                console.log(error);
                //@TODO handle when error.response.data.errors does not exist
                this.setState({
                    errors: error.response.data.errors
                });
            });
        }
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
        this.setState({
            location_id: id
        });
    }

    getCompanyId() {
        if(this.state.company) {
            return this.state.company.id;
        }
        return this.state.company_id || null;
    }

    render() {
        const { applications, is_loading, company, edit } = this.state;

        return (
            <Container>
            {!is_loading ? (
                    <form onSubmit={this.handleSubmit}>
                        <div className="flex flex-row mt-4">
                            <div className="basis-3/4">
                                <Label forInput="position" value="Job Title" />
                                <Input
                                    type="text"
                                    name="position"
                                    value={this.state.position}
                                    className="mt-1 block w-full"
                                    handleChange={this.handleFieldChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row space-x-4 mt-4">
                            <div className="basis-1/2">
                                <Label htmlFor="app_state" value="Job Location" />
                                <InputLocation
                                    stateFieldId='app_state'
                                    cityFieldId='app_city'
                                    locationFieldId='app_location_id'
                                    id='app_location'
                                    name='app_state'
                                    className='mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
                                    action={this.setLocationId}
                                    locationValue={this.state.location_value}
                                />
                            </div>
                            <div className="basis-1/2">
                                <Label htmlFor="app_zip" value="Zip Code" />
                                <Input
                                    type="text"
                                    name="app_zip"
                                    value={this.state.app_zip}
                                    className="mt-1 block w-full"
                                    handleChange={this.handleFieldChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row space-x-4 mt-4">
                            <div className="basis-1/3">
                                <Label forInput="post_age" value="Age of Job Posting (days)" />
                                <Input
                                    type="number"
                                    name="post_age"
                                    value={this.state.post_age}
                                    className="mt-1 block w-full"
                                    handleChange={this.handleFieldChange}
                                />
                            </div>
                            <div className="basis-1/3">
                                <Label value="Posted Salary Range (optional)" />
                                <Input
                                    type="number"
                                    name="posted_salary_min"
                                    placeholder="Minimum"
                                    value={this.state.posted_salary_min}
                                    className="mt-1 block w-full"
                                    handleChange={this.handleFieldChange}
                                />
                                <Input
                                    type="number"
                                    name="posted_salary_max"
                                    placeholder="Maximum"
                                    value={this.state.posted_salary_max}
                                    className="mt-1 block w-full"
                                    handleChange={this.handleFieldChange}
                                />
                            </div>
                            <div className="basis-1/3">
                                <Label forHtml="requested_salary" value="Requested Salary (optional)" />
                                <Input
                                    type="number"
                                    name="requested_salary"
                                    value={this.state.requested_salary}
                                    className="mt-1 block w-full"
                                    handleChange={this.handleFieldChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row mt-4">
                            <div className="basis-full">
                                <InputCompany 
                                    action={this.setCompanyId}
                                    className="className='mt-1 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    companyId={this.getCompanyId()}
                                    companyName={company ? (company.name) : null}
                                    companyWebsite={company ? (company.website) : null}
                                    companyPhone={company ? (company.phone) : null}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row mt-4">
                            <div className="basis-full">
                                <Label htmlFor="job_description" value="Job Description" />
                                <textarea 
                                    name="job_description"
                                    className="resize-y border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                                    onChange={this.handleFieldChange}
                                    value={this.state.job_description}
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex flex-row mt-4">
                            <div className="basis-full">
                                <Label htmlFor="resume_text" value="Resume" />
                                <textarea 
                                    name="resume_text"
                                    className="resize-y border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                                    onChange={this.handleFieldChange}
                                    value={this.state.resume_text}
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex flex-row mt-4">
                            <div className="basis-full">
                                <Label htmlFor="coverletter_text" value="Cover Letter" />
                                <textarea 
                                    name="coverletter_text"
                                    className="resize-y border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                                    onChange={this.handleFieldChange}
                                    value={this.state.coverletter_text}
                                ></textarea>
                            </div>
                        </div>
                        <button type='submit' className='py-2 px-4 mx-2 my-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
                            {edit ? (<span>Update Application</span>) : (<span>Create Application</span>)}
                        </button>
                    </form>

            ) : (
                <h3>LOADING</h3>
            )}
            </Container>
        );
    }
}

export default NewApplication;
