import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ApplicationsList extends Component {
    constructor() {
        super();
        this.state = {
            applications: [],
            is_loading: true,
            filtered_applications: [],
            search_query: ''
        }
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        axios.get('/api/applications').then(response => {
            console.log(response.data);
            this.setState({
                applications: response.data,
                filtered_applications: response.data,
                is_loading: false
            });
        });
    }
    convertDatetime(datetime) {
        let t = datetime.split(/[- :]/);
        let d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4],t[5]));
        return d.toLocaleDateString('en-US');
    }
    checkApplicationsForMatch(app, query) {
        if((app.applied_at && app.applied_at.toLowerCase().includes(query)) 
        || app.location.city.toLowerCase().includes(query) 
        || app.position.toLowerCase().includes(query) 
        || app.company.name.toLowerCase().includes(query)) {
            return true;
        }
    }
    onChange(event) {
        console.log(event.target.value);
        let query = event.target.value.toLowerCase();
        let apps = this.state.applications;
        let filtApps = [];
        for(let i = 0; i < apps.length; i++) {
            if(this.checkApplicationsForMatch(apps[i], query)) {
                filtApps.push(apps[i]);
            }
        }
        console.log("Filtered results:", filtApps);
        this.setState({
            search_query: event.target.value,
            filtered_applications: filtApps
        });
    }
    sortList(event) {
        console.log(event.target.value);
    }
    render() {
        console.log("Render. applications:", this.state.applications);
        const { filtered_applications, is_loading } = this.state;
        return (
            <div className='container'>
                <div className='list-header'>
                    <div className='jh-heading'>
                        Applications
                        <Link 
                            to='/create'
                            className='heading-button'
                        >
                            <i className="fas fa-plus-circle"></i>
                        </Link>
                    </div>
                    <div className='list-search'>
                        <input 
                            type='text'
                            placeholder='Search'
                            onChange={this.onChange}    
                        />
                    </div>
                </div>
            {!is_loading ? (
                <div className='list-container'>
                    {filtered_applications.map(application=>(
                        <Link 
                            className='list-row' 
                            key={application.id}
                            to={`/application/${application.id}`}
                        >
                            <div className='applist-date'>{application.applied_at ? this.convertDatetime(application.created_at) : "---"}</div>
                            <div className='applist-company'>{application.company.name}</div> 
                            <div className='applist-status'><span className='badge badge-pill badge-primary'>{application.status.status}</span></div>
                            <div className='applist-location'>{application.location.city}, {application.location.state}</div>
                            <div className='applist-position'>{application.position}</div>
                        </Link>
                    ))}
                </div>

            ) : (
                <h3>loading</h3>
            )}
            </div>
        );
    }
}

export default ApplicationsList;
