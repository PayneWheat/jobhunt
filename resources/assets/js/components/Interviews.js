import React, { Component } from 'react';
import InterviewsList from './InterviewsList';
class Interviews extends Component {
    render() {
        return (
            <div className='container'>
                <h2>Interviews</h2>
                <InterviewsList />
            </div>
        );
    }
}
export default Interviews;