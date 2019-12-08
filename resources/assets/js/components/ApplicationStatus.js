import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ApplicationStatus extends Component {
    constructor(props) {
        super();
        this.state = {
            status: props.status || {},
            statuses: [],
            is_loading: true,
            dropdown_mode: false,
            app_id: props.appId || ''
        }
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);

    }

    componentDidMount() {
        // get application statuses
        axios.get('/api/statuses').then(response => {
            console.log(response);
            this.setState({
                statuses: response.data,
                is_loading: false
            });
        });
    }

    onChange(event) {
        // call api endpoint to update application status
        let selectedStatus = this.state.statuses.filter(statusItem => {
            return statusItem.status == event.target.value;
        })[0] || null;
        if(selectedStatus) {
            console.log("SelectedStatus:", selectedStatus, event.target.value);
            this.setState({
                is_loading: true,
                dropdown_mode: false
            });
            axios.get('/api/applications/status/' + this.state.app_id + "/" + selectedStatus.id).then((response)=>{
                this.setState({
                    status: selectedStatus,
                    is_loading: false
                });
            });
        }
        // select the correct status
    }

    onClick(event) {
        this.setState({
            dropdown_mode: true
        });
    }

    render() {
        const { is_loading, dropdown_mode, status, statuses } = this.state;
        return (
            <span>
            {!is_loading ? (
                dropdown_mode ? (
                <select 
                    className='app-status-drop pull-right'
                    onChange={this.onChange}
                    defaultValue={status.status}
                >
                {statuses.map(statusItem=>(
                    <option key={statusItem.id}>{statusItem.status}</option>
                ))}
                </select>
                ) : (
                    <span 
                        className='applist-status pull-right badge badge-pill badge-primary'
                        onClick={this.onClick}
                    >
                        {this.state.status.status}
                    </span>
                )
            ) : (
                <span className='app-status-drop pull-right'><em>loading</em></span>
            )}
            </span>
        );
    }
}

export default ApplicationStatus;