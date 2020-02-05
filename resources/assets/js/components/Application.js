import axios from 'axios';
import React, { Component } from 'react';
import InputCompany from './InputCompany';
import InputLocation from './InputLocation';
import ApplicationStatus from './ApplicationStatus';
import { Link } from 'react-router-dom';
import InterviewsList from './InterviewsList';
import ApplicationInfo from './ApplicationInfo';
import NewNote from './NewNote';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { LinkContainer } from 'react-router-bootstrap'
import NewInterview from './NewInterview';

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
            coverletter_keywords: null,
            show_comment_modal: false,
            show_interview_modal: false
        }
        this.showCommentModal = this.showCommentModal.bind(this);
        this.hideCommentModal = this.hideCommentModal.bind(this);
        this.showInterviewModal = this.showInterviewModal.bind(this);
        this.hideInterviewModal = this.hideInterviewModal.bind(this);
    }
    componentDidMount() {
        const app_id = this.props.match.params.id;
        this.setState({
            app_id: app_id
        });
        axios.get('/api/applications/' + app_id).then(response => {
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
    showCommentModal() {
        this.setState({
            show_comment_modal: true
        })
    }
    hideCommentModal() {
        this.setState({
            show_comment_modal: false
        })
    }
    showInterviewModal() {
        this.setState({
            show_interview_modal: true
        })
    }
    hideInterviewModal() {
        this.setState({
            show_interview_modal: false
        })
    }
    render() {
        const { application, is_loading, app_id, show_comment_modal, show_interview_modal } = this.state;
        return (
            <div className='container'>
            {!is_loading ? (
                <div>
                    <div className='edit-row'>
                        <LinkContainer to={'/application/edit/' + application.id}>
                            <Button className="app-button"><i className="fas fa-edit"></i>Edit</Button>
                        </LinkContainer>
                        
                        <Button className="app-button"><i className="fas fa-user-plus"></i> Add Contact</Button>
                        <Button className="app-button" onClick={this.showCommentModal}><i className="fas fa-sticky-note"></i> Add Note</Button>
                        <Button className="app-button" onClick={this.showInterviewModal}><i className="fas fa-calendar"></i> Add Interview</Button>
                        {/*
                        <LinkContainer to={'/application/' + application.id + '/add/interview'}>
                                <Button className="app-button"><i className="fas fa-calendar"></i>Add Interview</Button>
                        </LinkContainer>
                        */}
                        
                        <Modal show={show_comment_modal} onHide={this.hideCommentModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>New Note</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <NewNote 
                                    application={application}
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.hideCommentModal}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={this.hideCommentModal}>
                                    Create Note
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={show_interview_modal} onHide={this.hideInterviewModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>New Interview</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <NewInterview application={application}/>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.hideInterviewModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
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
                            {application.applied_at ? (
                                <div className='app-date'>Date applied: { application.applied_at }</div>
                            ) : null}
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
                    <h2 className='jh-heading'>Interviews</h2>
                    <InterviewsList
                        applicationId={app_id}
                    />
                    <h2 className='jh-heading'>Application Info</h2>
                    <ApplicationInfo 
                        jobDesc={application.job_description}
                        resumeText={application.resume_text}
                        coverLetterText={application.coverletter_text}
                    />

                    <div className="app-notes">
                        <h2 className='jh-heading'>Notes</h2>
                        {application.notes.map(note => (
                            <div
                                key={note.id}
                                className='application-note'
                            >
                                <div className='note-header'>{note.created_at} {note.system_flag ? (<span className='note-header-sys'>SYSTEM NOTE</span>) : null}</div>
                                {note.note}
                            </div>
                        ))}
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
