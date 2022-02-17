import axios from 'axios';
import React, { Component } from 'react';
import { Inertia } from '@inertiajs/inertia'
import InputCompany from '@/Components/InputCompany';
import InputLocation from '@/Components/InputLocation';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
            job_description: this.state.job_description,
            resume_text: this.state.resume_text,
            coverletter_text: this.state.coverletter_text,
            posted_salary_min: this.state.posted_salary_min,
            posted_salary_max: this.state.posted_salary_max,
            requested_salary: this.state.requested_salary,
            post_age: this.state.post_age,
            user_id: this.state.user_id
        }

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
        const { applications, is_loading, company } = this.state;
        return (
            <Container>
            {!is_loading ? (
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label htmlFor='position'>Position</Form.Label>
                                    <Form.Control
                                        id='position'
                                        type='text'
                                        /*className={`form-control ${this.hasErrorFor('position') ? 'is-invalid' : ''}`}*/
                                        name='position'
                                        value={this.state.position}
                                        onChange={this.handleFieldChange}
                                    />
                                    {/*this.renderErrorFor('position')*/}
                                </Form.Group>
                            </Col>
                            <Col md={5}>
                                <Form.Group>
                                    <Form.Label htmlFor='app_location'>Job Location</Form.Label>
                                    <InputLocation
                                            stateFieldId='app_state'
                                            cityFieldId='app_city'
                                            locationFieldId='app_location_id'
                                            id='app_location'
                                            name='app_state'
                                            /*className={`form-control ${this.hasErrorFor('app_location') ? 'is-invalid' : ''}`}*/
                                            className='form-control'
                                            action={this.setLocationId}
                                            locationValue={this.state.location_value}
                                        />
                                        {/*this.renderErrorFor('app_location')*/}                         
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <InputCompany 
                                    action={this.setCompanyId}
                                    companyId={this.getCompanyId()}
                                    companyName={company ? (company.name) : null}
                                    companyWebsite={company ? (company.website) : null}
                                    companyPhone={company ? (company.phone) : null}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label htmlFor='resume'>Job Description</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        id='job_description' 
                                        name='job_description'
                                        onChange={this.handleFieldChange}
                                        value={this.state.job_description}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Label htmlFor='post_age'>Age of Job Posting (days)</Form.Label>
                                <Form.Group 
                                    // noGutters={true}
                                >
                                    <Form.Control 
                                        id='post_age'
                                        type='number'
                                        name='post_age'
                                        onChange={this.handleFieldChange}
                                        value={this.state.post_age}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Label htmlFor='requested_salary'>Requested Salary (optional)</Form.Label>
                                <Form.Group 
                                    // noGutters={true}
                                >
                                    <Form.Control
                                        id='requested_salary'
                                        type='number'
                                        name='requested_salary'
                                        onChange={this.handleFieldChange}
                                        value={this.state.requested_salary}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Form.Label htmlFor='post_age'>Posted Salary Range (optional)</Form.Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Control
                                        id='posted_salary_min'
                                        type='number'
                                        placeholder='Minimum'
                                        name='posted_salary_min'
                                        onChange={this.handleFieldChange}
                                        value={this.state.posted_salary_min}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Control
                                        id='posted_salary_max'
                                        type='number'
                                        placeholder='Maximum'
                                        name='posted_salary_max'
                                        onChange={this.handleFieldChange}
                                        value={this.state.posted_salary_max}
                                    />
                                </Form.Group>                            
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label htmlFor='resume_text'>Resume Submitted</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        id='resume_text' 
                                        className='form-control'
                                        name='resume_text'
                                        onChange={this.handleFieldChange}
                                        value={this.state.resume_text}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label htmlFor='coverletter_text'>Cover Letter Submitted</Form.Label>
                                    <Form.Control
                                        as='textarea' 
                                        id='coverletter_text' 
                                        className='form-control'
                                        name='coverletter_text'
                                        onChange={this.handleFieldChange}
                                        value={this.state.coverletter_text}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button type='submit'>Create Application</Button>
                    </Form>

            ) : (
                <h3>LOADING</h3>
            )}
            </Container>
        );
    }
}

export default NewApplication;
