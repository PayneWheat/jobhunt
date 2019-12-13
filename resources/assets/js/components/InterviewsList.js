import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class InterviewsList extends Component {
    constructor() {
        super();
        this.state = {
            interviews: [],
            is_loading: true,
            mode: 'list'
        }
    }
    componentDidMount() {
        axios.get('/api/interviews').then(response => {
            console.log(response.data);
            this.setState({
                interviews: response.data,
                is_loading: false
            }, ()=>{console.log(this.state)});
        });
    }
    convertDatetime(datetime) {
        let t = datetime.split(/[- :]/);
        let d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4],t[5]));
        console.log(d);
        return d.toLocaleDateString('en-US');
    }
    render() {
        const { is_loading, interviews } = this.state;
        return (
            <div className='container'>
                <div>Interviews</div>
                {!is_loading ? (
                    interviews.map(interview=>(
                        <div key={interview.id}>
                            {interview.at_time} with {interview.application.company.name}, {interview.application.position}
                        </div>
                    ))
                ) : (
                    <h3>loading</h3>
                )}
            </div>
        );
    }
}

export default InterviewsList;
