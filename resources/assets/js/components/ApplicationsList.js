import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ApplicationsList extends Component {
    constructor() {
        super();
        this.state = {
            applications: [],
            is_loading: true
        }
    }
    componentDidMount() {
        axios.get('/api/applications').then(response => {
            console.log(response.data);
            this.setState({
                applications: response.data,
                is_loading: false
            })
        });
    }
    convertDatetime(datetime) {
        let t = datetime.split(/[- :]/);
        let d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4],t[5]));
        console.log(d);
        return d.toLocaleDateString('en-US');
    }
    render() {
        const { applications, is_loading } = this.state;
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
                                            to={`/application/${application.id}`}
                                            key={application.id}
                                        >
                                            <span className='applist-date'>{this.convertDatetime(application.created_at)}:</span>
                                            <span className='applist-company'>{application.company.name},</span> 
                                            <span className='applist-position'>{application.position}</span>
                                            <span className='applist-status pull-right badge badge-pill badge-primary'>{application.status.status}</span>
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
