import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class InterviewsList extends Component {
    constructor(props) {
        super();
        this.state = {
            interviews: [],
            is_loading: true,
            application_id: props.applicationId || null,
            mode: 'list'
        }
    }
    componentDidMount() {
        if(this.state.application_id) {
            axios.get('/api/applications/' + this.state.application_id +'/interviews').then(response => {
                console.log("specific app interviews:", response.data);
                this.setState({
                    interviews: response.data,
                    is_loading: false
                }, ()=>{console.log(this.state)});
            });
        } else {
            axios.get('/api/interviews').then(response => {
                console.log(response.data);
                this.setState({
                    interviews: response.data,
                    is_loading: false
                }, ()=>{console.log(this.state)});
            });
        }
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
                {!is_loading ? (
                    interviews.length > 0 ? (
                        <div>
                            <div>Interviews</div>
                            {interviews.map(interview=>(
                                <div key={interview.id}>
                                    {interview.at_time} with {interview.application.company.name}, {interview.application.position}
                                </div>
                            ))}
                        </div>
                    ) : null
                ) : (
                    <h3>loading</h3>
                )}
            </div>
        );
    }
}

export default InterviewsList;
