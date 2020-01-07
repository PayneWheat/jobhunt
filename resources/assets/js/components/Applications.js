import React, { Component } from 'react';
import ApplicationsList from './ApplicationsList';
class Applications extends Component {
    render() {
        return (
            <div className='container'>
                <h2>Applications</h2>
                <ApplicationsList />
            </div>
        );
    }
}
export default Applications;