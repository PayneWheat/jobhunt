import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InputCompany from './InputCompany';

class EditCompany extends Component {
    constructor(props) {
        super();
        
        this.state = {
            company: {},
            is_loading: true
        };
        this.setCompanyId = this.setCompanyId.bind(this);
    }
    componentDidMount() {
        const co_id = this.props.match.params.id;
        axios.get('/api/companies/' + co_id).then(response => {
            console.log(response);
            this.setState({
                company: response.data,
                is_loading: false
            });
        });
    }
    setCompanyId(id) {
        //console.log("Setting company id: " + id);
        this.setState({
            company_id: id
        });
    }
    render() {
        const { company, is_loading } = this.state;
        return (
            
            <div className='container'>
            {!is_loading ? (
                <div>  
                    <InputCompany 
                        action={this.setCompanyId}
                        companyId={this.state.company.id}
                        companyName={this.state.company.name}
                        companyWebsite={this.state.company.website}
                        companyPhone={this.state.company.phone}
                        readOnlyFields="true"
                    />
                    <div>
                        <button className='btn btn-primary'>Update Application</button>
                        <button className='btn btn-danger'>Delete</button>
                    </div>
                </div>
            ) : (
                <h3>loading</h3>
            )}
            </div>
        );
    }
}


export default EditCompany;