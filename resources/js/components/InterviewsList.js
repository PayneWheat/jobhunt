import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class InterviewsList extends Component {
    constructor(props) {
        super();

        console.log('InterviewsList::construct', props);
        this.state = {
            is_loading: true,
            application_id: props.applicationId || null,
            mode: 'list',
            application_key: props.applicationKey || Math.random(),
            interviews: props.interviews || []
        }

        console.log(this.state.interviews);
    }

    componentDidUpdate() {
        console.log('InterviewList::componentDidUpdate', this.props);
        // if(this.state.application_id) {
        //     axios.get('/api/applications/' + this.state.application_id +'/interviews').then(response => {
        //         this.setState({
        //             interviews: response.data,
        //             is_loading: false
        //         }, () => {
        //             console.log('interviews', this.state.interviews)
        //         });
        //     });
        // } else {
        //     axios.get('/api/interviews').then(response => {
        //         this.setState({
        //             interviews: response.data,
        //             is_loading: false
        //         }, () => {
        //             console.log(this.state.interviews)
        //         });
        //     });
        // }
    }

    componentDidMount() {
        console.log('InterviewList::componentDidMount');
        // this.setState({
        //     is_loading: false
        // });
        if(this.state.application_id) {
            axios.get('/api/applications/' + this.state.application_id +'/interviews').then(response => {
                this.setState({
                    interviews: response.data,
                    is_loading: false
                }, () => {
                    console.log('interviews for application', this.state.interviews)
                });
            });
        } else {
            axios.get('/api/interviews').then(response => {
                this.setState({
                    interviews: response.data,
                    is_loading: false
                }, () => {
                    console.log('interviews', this.state.interviews)
                });
            });
        }
    }

    convertDatetime(datetime, timeonly=false) {
        let t = datetime.split(/[- :]/);
        let d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
        if(!timeonly) {
            return d.toLocaleDateString('en-US');
        } else {
           //return d.toLocaleTimeString();
            return (t[3] <= 12 ? t[3] : t[3] % 12) + ":" + t[4] + (t[3] < 12 ? " AM" : " PM");
        }
    }
    
    render() {
        const { is_loading, interviews } = this.state;
        console.log('InterviewList::render', interviews);
        return (
            <div className='interview-list'>
                {!is_loading ? (
                    interviews.length > 0 ? (
                        <div className='list-container'>
                            {interviews.map(interview => (
                                <Link 
                                    className='list-row' 
                                    key={interview.id}
                                    to={`/application/${interview.application_id}`}
                                >
                                    <div className='interviewlist-date'>
                                        {this.convertDatetime(interview.at_time)}
                                    </div>
                                    <div className='interviewlist-time'>
                                        {this.convertDatetime(interview.at_time, true)}
                                    </div>
                                    <div className='interviewlist-type'>
                                        {interview.interview_type.type}
                                    </div>
                                    <div className='interviewlist-company'>
                                        {interview.application.company.name || application.company.name}
                                    </div>
                                    <div className='interviewlist-position'>
                                        {interview.application.position || application.position}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div><em>No interviews</em></div>
                    )
                ) : (
                    <h3>loading</h3>
                )}
            </div>
        );
    }
}

export default InterviewsList;
