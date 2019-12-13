import React, { Component } from 'react';
import ApplicationsList from './ApplicationsList';
import InterviewsList from './InterviewsList';
class Home extends Component {
    render() {
        return (
            <div>
                <ApplicationsList />
                <InterviewsList />
            </div>
        );
    }
}
export default Home;