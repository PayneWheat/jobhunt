import React, { Component } from 'react';
import ApplicationsList from './ApplicationsList';
import InterviewsList from './InterviewsList';
import { Link } from 'react-router-dom';
class Home extends Component {
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
                
                <h2 className='jh-heading'>Interviews</h2>
                <InterviewsList />
            </div>
        );
    }
}
export default Home;