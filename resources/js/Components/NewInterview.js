import axios from 'axios';
import React, { Component } from 'react';
//import Select from 'react-select';
//import Autosuggest from 'react-autosuggest';
import InputCompany from '@/Components/InputCompany';
import InputLocation from '@/Components/InputLocation';

const getCompanySuggestionValue = suggestion => suggestion.name;

class NewInterview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_loading: true,
            user_id: props.user_id,
            application: props.application,
            types: [],
            interview_type: '',
            interview_type_id: null,
            interview_datetime: null,
            location_id: null
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.setLocationId = this.setLocationId.bind(this);
    }

    componentDidMount() {
        axios.get('/api/interviews/types').then(response => {
            this.setState({
                is_loading: false,
                types: response.data
            });
        });
    }

    onSubmit(event) {
        event.preventDefault();

        let curType = this.state.types.filter(type => {
            return type.type == this.state.interview_type;
        })[0];

        const interview = {
            user_id: this.state.user_id,
            at_time: this.state.interview_datetime,
            interview_type_id: curType.id,
            application_id: this.state.application.id,
        }
        console.log("Form submitted", interview);

        // axios.post('/api/interviews', interview).then(response=>{
        //     console.log(response);
        //     return response;
        // });
    }

    handleFieldChange(event) {
        console.log('NewInterview::handleFieldChange', event.target.name, event.target.value);
        if(event.target.name === 'interview_type') {
            console.log('interview_type target', this.state);
            let curType = this.state.types.filter(type => {
                return type.type == event.target.value;
            })[0];
            let typeId = curType.id;
            this.setState({
                interview_type: curType.type,
                interview_type_id: typeId
            }, () => console.log('interview type changed', this.state.interview_type_id));
        } else {
            this.setState({
                [event.target.name]: event.target.value
            }, ()=>{
                console.log("STATE", this.state)
                this.props.action(this.state);
            });
        }
    }

    setLocationId(id) {
        this.setState({
            location_id: id
        });
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
                                {types.map(type => (
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
                                <InputLocation
                                    action={this.setLocationId}
                                    stateFieldId='app_state'
                                    cityFieldId='app_city'
                                    locationFieldId='app_location_id'
                                    id='app_location'
                                    name='app_state'
                                    className='form-control'
                                />
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
                    {/* <input className='btn btn-primary' value='Submit' type='submit'/> */}
                </form>
                ) : (
                <h3>loading</h3>
                )}
            </div>
        );
    }
}

export default NewInterview;
