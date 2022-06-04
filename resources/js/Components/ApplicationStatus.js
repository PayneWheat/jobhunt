import axios from 'axios';
import React, { Component } from 'react';


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
            <div>
            {!is_loading ? (
                dropdown_mode ? (
                <select 
                    className='block text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500'
                    onChange={this.onChange}
                    defaultValue={status.status}
                >
                {statuses.map(statusItem=>(
                    <option key={statusItem.id}>{statusItem.status}</option>
                ))}
                </select>
                ) : (
                    <div 
                        className='px-4 py-2 text-base rounded-full text-white  bg-indigo-500'
                        onClick={this.onClick}
                    >
                        {this.state.status.status}
                    </div>
                )
            ) : (
                <div className='px-4 py-2 text-base rounded-full text-white  bg-indigo-500'>
                    loading
                </div>
            )}
            </div>
        );
    }
}

export default ApplicationStatus;