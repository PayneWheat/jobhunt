import axios from 'axios';
import React, { Component } from 'react';
import InputCompany from './InputCompany';
import InputLocation from './InputLocation';
import ApplicationStatus from './ApplicationStatus';
import { Link } from 'react-router-dom';

const getCompanySuggestionValue = suggestion => suggestion.name;
class Application extends Component {
    constructor() {
        super();
        this.state = {
            app_id: null,
            application: null,
            is_loading: true,
            keyword_matches: null,
            jd_keywords: null,
            resume_keywords: null,
            coverletter_keywords: null
        }

    }
    componentDidMount() {
        const app_id = this.props.match.params.id;
        this.setState({
            app_id: app_id
        });
        axios.get('/api/applications/' + app_id).then(response => {
            console.log(response);
            this.setState({
                application: response.data,
            });
            let jd_keys = keyword_extractor.extract(this.state.application.job_description, {
                language: "english",
                remove_digits: true,
                return_changed_case: true,
                remove_duplicates: true
            });
            let resume_keys = keyword_extractor.extract(this.state.application.resume_text, {
                language: "english",
                remove_digits: true,
                return_changed_case: true,
                remove_duplicates: true
            });
            let coverletter_keys = keyword_extractor.extract(this.state.application.coverletter_text, {
                language: "english",
                remove_digits: true,
                return_changed_case: true,
                remove_duplicates: true
            });
            console.log(jd_keys, resume_keys);
            let matches = [];
            for(let i = 0; i < jd_keys.length; i++) {
                for(let j = 0; j < resume_keys.length; j++) {
                    if(jd_keys[i] == resume_keys[j]) {
                        matches.push(jd_keys[i]);
                    }
                }
                
                for(let j = 0; j < coverletter_keys.length; j++) {
                    if(jd_keys[i] == coverletter_keys[j]) {
                        matches.push(jd_keys[i]);
                    }
                }
                
            }
            console.log(matches);
            this.setState({
                keyword_matches: matches,
                jd_keywords: jd_keys,
                resume_keywords: resume_keys,
                coverletter_keywords: coverletter_keys,
                is_loading: false
            });
        });
    }
    /*
    applicationHeader() {
        return this.state.application.position;
    }
    */
    convertDatetime(datetime) {
        let t = datetime.split(/[- :]/);
        let d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4],t[5]));
        return d.toLocaleDateString('en-US');
    }
    percentageRound(num, places) {
        return num.toFixed(places);
    }
    render() {
        const { application, is_loading, app_id } = this.state;
        console.log("app", application, is_loading);
        return (
            <div className='container'>
            {!is_loading ? (
                <div className='row'>
                    <div className='edit-row'>
                        <Link 
                            to={'/application/edit/' + application.id}
                            className='btn btn-sm btn-info'
                        >
                            <i className="fas fa-edit"></i>
                            Edit
                        </Link>
                        <a href='#' className='btn btn-sm btn-info'><i className="fas fa-user-plus"></i>Add Contact</a>
                        <a href='#' className='btn btn-sm btn-info'><i className="fas fa-sticky-note"></i>Add Note</a>
                        <Link 
                            to={'/application/' + application.id + '/add/interview'} 
                            className='btn btn-sm btn-info'

                        >
                                <i className="fas fa-calendar"></i>
                                Add Interview
                        </Link>
                    </div>
                    <section className='app-header'>
                        <div className='app-position'>{ application.position }</div>
                        
                        <div>
                            <div className='app-company'>
                                { application.company.name }
                                <ApplicationStatus 
                                    appId={ app_id }
                                    status={ application.status }
                                />
                            </div>
                            <div className='app-location'>{application.location.city}, {application.location.state}</div>
                            <div className='app-date'>Date applied: { this.convertDatetime(application.created_at) }</div>
                        </div>
                        <div className='app-info'>
                            <div className='app-matches'>
                                <svg width="20" height="20">
                                    <circle r="10" cx="10" cy="10" fill="lightgrey" />
                                    <circle r="5" cx="10" cy="10" stroke="darkorange" 
                                        strokeWidth="10"
                                        fill="transparent"
                                        strokeDasharray={`calc(${this.state.keyword_matches.length} * 31.4 / ${this.state.jd_keywords.length}), 31.4`} />
                                </svg>
                                {this.percentageRound(this.state.keyword_matches.length / this.state.jd_keywords.length * 100, 1)}% match. <br/>
                                {this.state.keyword_matches.length} keywords hit.
                            </div>
                            <div className='app-post-age'>
                                <div className='app-sandwich'>Job post was</div>
                                <div className='app-filler'>{application.post_age} days</div>
                                <div className='app-sandwich'>old when applied</div>
                            </div>
                            {(application.posted_salary_min != undefined || application.posted_salary_max != undefined || application.requested_salary != undefined) &&
                            <div className='app-salary'>
                                {(application.posted_salary_min != undefined || application.posted_salary_max != undefined) &&
                                    <div>Salary Range:&nbsp;
                                    {application.posted_salary_min &&
                                        <span>${application.posted_salary_min}</span>
                                    }
                                    {application.posted_salary_min && application.posted_salary_max &&
                                        <span>&nbsp;-&nbsp;</span>
                                    }
                                    {application.posted_salary_max &&
                                        <span>${application.posted_salary_max}</span>
                                    }</div>
                                }
                                {application.requested_salary &&
                                <div>Requested Salary: ${application.requested_salary}</div>
                                }
                            </div>
                            }
                        </div>
                    </section>
                    <div className='app-job-description'>
                        <h3>Job Description</h3>
                        <article>{application.job_description}</article>
                    </div>

                    <div className='app-resume'>
                        <h3>Submitted Resume</h3>
                        <article>{application.resume_text}</article>
                    </div>
                    <div className='app-cover-letter'>
                        <h3>Submitted Cover Letter</h3>
                        <article>{application.coverletter_text}</article>
                    </div>

                </div>

            ) : (
                <h3>loading</h3>
            )}
            </div>
            
        );
    }
}

export default Application;
