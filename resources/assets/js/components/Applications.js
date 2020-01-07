import React, { Component } from 'react';
import ApplicationsList from './ApplicationsList';
import { Link } from 'react-router-dom';
class Applications extends Component {
    render() {
        return (
            <div className='container'>
                <h2>Applications</h2>
                <Link
                        to='/create'
                    >
                    Create Application
                </Link>
                <ApplicationsList />
            </div>
        );
    }
}
export default Applications;