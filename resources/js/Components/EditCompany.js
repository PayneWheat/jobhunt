import React, { Component } from 'react';
import axios from 'axios';
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
        // const co_id = this.props.match.params.id;
        const co_id = this.props.companyId;
        axios.get('/api/companies/' + co_id).then(response => {
            this.setState({
                company: response.data,
                is_loading: false
            });
        });
    }

    setCompanyId(id) {
        this.setState({
            company_id: id
        });
    }
    
    render() {
        const { company, is_loading } = this.state;
        return (
            <div id="input-company">
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
                        <button type="submit" className='btn btn-primary'>Update Company</button>
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