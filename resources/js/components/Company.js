import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Company extends Component {
    constructor(props) {
        super();
        
        this.state = {
            company: {},
            is_loading: true
        };

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
    render() {
        const { company, is_loading } = this.state;
        return (
            
            <div className='container'>
            {!is_loading ? (
                <div>
                    <div>{company.name}</div>
                    <div>{company.phone}</div>
                    <div>{company.website}</div>
                    <div>
                        <Link 
                            to={'/company/edit/' + company.id}
                            className='btn btn-sm btn-info'
                        >
                            Edit
                        </Link>
                    </div>
                </div>
            ) : (
                <h3>loading</h3>
            )}
            </div>
        );
    }
}


export default Company;