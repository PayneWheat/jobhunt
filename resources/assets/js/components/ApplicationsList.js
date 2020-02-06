import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ApplicationsList extends Component {
    constructor() {
        super();
        this.state = {
            applications: [],
            search_query: "",
            is_loading: true
        }
        this.onChangeSearch = this.onChangeSearch.bind(this);
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
        return d.toLocaleDateString('en-US');
    }
    onChangeSearch(event) {
        this.setState({
            search_query: event.target.value
        }, () => {console.log(this.state.search_query)});
    }
    render() {
        const { applications, is_loading } = this.state;
        return (
            <div className='container'>
                <div className='list-search'>
                    <input 
                        type='text'
                        name='applist-search' 
                        id='applist-search'
                        placeholder='Search...'
                        onChange={this.onChangeSearch}
                    />
                </div>
                <div className='list-container'>
                    <div className='list-header'>
                        <div className='applist-date list-col-header'>Applied</div>
                        <div className='applist-location list-col-header'>Location</div>
                        <div className='applist-company list-col-header'>Company</div>
                        <div className='applist-position list-col-header'>Position</div>
                        <div className='applist-status list-col-header'>Status</div>
                    </div>
                    {applications.map(application=>(
                        <Link 
                            className='list-row' 
                            key={application.id}
                            to={`/application/${application.id}`}
                        >
                            <div className='applist-date'>{application.applied_at ? this.convertDatetime(application.created_at) : "---"}</div>
                            <div className='applist-location'>{application.location.city}, {application.location.state}</div>
                            <div className='applist-company'>{application.company.name}</div> 
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
