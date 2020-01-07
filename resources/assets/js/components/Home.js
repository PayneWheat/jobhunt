import React, { Component } from 'react';
import ApplicationsList from './ApplicationsList';
import InterviewsList from './InterviewsList';
class Home extends Component {
    render() {
        return (
            <div className='container'>
                <h2>Applications</h2>
                <ApplicationsList />
                <h2>Interviews</h2>
                <InterviewsList />
            </div>
        );
    }
}
export default Home;