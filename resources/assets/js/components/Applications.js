import React, { Component } from 'react';
import ApplicationsList from './ApplicationsList';
import { Link } from 'react-router-dom';
class Applications extends Component {
    render() {
        return (
            <div className='container'>
                <h2 className='jh-heading'>
                    Applications
                    <Link 
                        to='/create'
                        className='heading-button'
                    >
                        <i className="fas fa-plus-circle"></i>
                    </Link>
                </h2>
                <ApplicationsList />
            </div>
        );
    }
}
export default Applications;