import React, { Component } from 'react';
import ApplicationsList from './ApplicationsList';
import InterviewsList from './InterviewsList';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className='container'>
                <ApplicationsList />
                
                <h2 className='jh-heading'>Interviews</h2>
                <InterviewsList />
            </div>
        );
    }
}

export default Home;