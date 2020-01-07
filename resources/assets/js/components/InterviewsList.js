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
    convertDatetime(datetime, timeonly=false) {
        let t = datetime.split(/[- :]/);
        let d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
        console.log(d);
        if(!timeonly) {
            return d.toLocaleDateString('en-US');
        } else {
            /*
            const options = {
                timeZone: "America/Chicago",
                hour12: true,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
            return d.toLocaleTimeString('en-US', options);
            */
           console.log(t, d.getHours(), d.getMinutes(), d.getSeconds());
           //return d.toLocaleTimeString();
            return (t[3] <= 12 ? t[3] : t[3] % 12) + ":" + t[4] + (t[3] < 12 ? " AM" : " PM");
        }
    }
    render() {
        const { is_loading, interviews } = this.state;
        return (
            <div className='container'>
                {!is_loading ? (
                    interviews.length > 0 ? (
                        <div className='list-container'>
                            {interviews.map(interview=>(
                                <Link 
                                className='list-row' 
                                key={interview.id}
                                to={`/application/${interview.application.id}`}
                                >
                                    <div className='interviewlist-date'>
                                        {this.convertDatetime(interview.at_time)}
                                    </div>
                                    <div className='interviewlist-time'>
                                        {this.convertDatetime(interview.at_time, true)}
                                    </div>
                                    <div className='interviewlist-company'>
                                        {interview.application.company.name}
                                    </div>
                                    <div className='interviewlist-position'>
                                        {interview.application.position}
                                    </div>
                                </Link>
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
