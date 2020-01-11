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
                <div className='list-container'>
                    {applications.map(application=>(
                        <Link 
                            className='list-row' 
                            key={application.id}
                            to={`/application/${application.id}`}
                        >
                            <div className='applist-date'>{application.applied_at ? this.convertDatetime(application.created_at) : "---"}</div>
                            <div className='applist-location'>{application.location.city}, {application.location.state}</div>
                            <div className='applist-company'>{application.company.name},</div> 
                            <div className='applist-position'>{application.position}</div>
                            <div className='applist-status'><span className='pull-right badge badge-pill badge-primary'>{application.status.status}</span></div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
}

export default ApplicationsList;
