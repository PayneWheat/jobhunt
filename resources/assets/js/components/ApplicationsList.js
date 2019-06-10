import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ApplicationsList extends Component {
    constructor() {
        super();
        this.state = {
            applications: []
        }
    }
    componentDidMount() {
        axios.get('/api/applications').then(response => {
            this.setState({
                applications: response.data
            })
        });
    }
    render() {
        const { applications } = this.state;
        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>Applications</div>
                            <div className='card-body'>
                                <Link className='btn btn-primary mb-3' to='/create'>
                                    Create new application
                                </Link>
                                <ul className='list-group list-group-flush'>
                                    {applications.map(application=>(
                                        <Link 
                                            className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                                            to={`/${application.id}`}
                                            key={application.id}
                                        >
                                            {application.company}
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ApplicationsList;
