import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

class ApplicationsList extends Component {
    constructor() {
        super();
        this.state = {
            applications: [],
            is_loading: true,
            filtered_applications: [],
            search_query: '',
            max_items: 10,
            starting_index: 0,
            pages: 0,
            active: 1,
            pagination_buttons: [],
            displayed_applications: []
        }
        this.onChange = this.onChange.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.updatePagination = this.updatePagination.bind(this);
    }
    componentDidMount() {
        axios.get('/api/applications').then(response => {
            console.log(response.data);
            this.setState({
                applications: response.data,
                displayed_applications: response.data.slice(0, this.state.max_items),
                filtered_applications: response.data,
                pages: Math.ceil(response.data.length / this.state.max_items),
                is_loading: false
            }, () => {
                console.log(this.state.displayed_applications, this.state.pages)
                this.updatePagination();
            });
        });
    }
    updatePagination() {
        let items = []
        let displayedPages = Math.ceil(this.state.filtered_applications.length / this.state.max_items);
        for(let num = 1; num <= displayedPages; num++) {
            items.push(
                <Pagination.Item key={num} active={num == this.state.active} data-page-num={num} onClick={this.onPageChange}>
                    {num}
                </Pagination.Item>
            );
        }
        this.setState({
            pagination_buttons: items,
            pages: displayedPages
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
        return false;
    }
    onPageChange(event) {
        let pageNum = event.target.getAttribute('data-page-num');
        console.log("pageNum", pageNum);
        let startingIndex = (pageNum - 1) * this.state.max_items; 
        console.log("starting index:", startingIndex);
        let filtApps = this.state.filtered_applications.slice(startingIndex, startingIndex + this.state.max_items);
        this.setState({
            displayed_applications: filtApps,
            active: pageNum
        }, () => {
            this.updatePagination();
            console.log(this.state.active);
        });
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
            filtered_applications: filtApps,
            active: 1,
            displayed_applications: filtApps.slice(0, this.state.max_items)
        }, () => {
            console.log("filt", this.state.filtered_applications, this.state.displayed_applications);
            this.updatePagination();
        });
    }
    sortList(event) {
        console.log(event.target.value);
    }
    render() {
        console.log("Render. applications:", this.state.applications);
        const { filtered_applications, is_loading, pagination_buttons, displayed_applications } = this.state;
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
                    {displayed_applications.map(application=>(
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
                    <Pagination>{pagination_buttons}</Pagination>
                </div>

            ) : (
                <h3>loading</h3>
            )}
            </div>
        );
    }
}

export default ApplicationsList;
