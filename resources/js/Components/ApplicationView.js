import axios from 'axios';
import React, { Component } from 'react';
import { Link } from '@inertiajs/inertia-react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ApplicationStatus from '@/Components/ApplicationStatus';
import InterviewsList from './InterviewsList';
import ApplicationInfo from '@/Components/ApplicationInfo';
import NewNote from '@/Components/NewNote';
import NewInterview from '@/Components/NewInterview';
import ContactsList from '@/Components/ContactsList';
import NewContact from '@/Components/NewContact';

const getCompanySuggestionValue = suggestion => suggestion.name;
class ApplicationView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            user_id: props.userId,
            app_id: props.applicationId,
            application: null,
            company: null,
            is_loading: true,
            keyword_matches: null,
            jd_keywords: null,
            resume_keywords: null,
            coverletter_keywords: null,
            show_comment_modal: false,
            show_interview_modal: false,
            show_contact_modal: false,
            new_note: '',
            notes: [],
            contacts: [],
            interviews: [],
            new_contact: null,
            new_interview: null,
            application_age: null,
            refresh_key: null
        }

        this.showCommentModal = this.showCommentModal.bind(this);
        this.hideCommentModal = this.hideCommentModal.bind(this);
        this.showInterviewModal = this.showInterviewModal.bind(this);
        this.hideInterviewModal = this.hideInterviewModal.bind(this);
        this.showContactModal = this.showContactModal.bind(this);
        this.hideContactModal = this.hideContactModal.bind(this);
        this.createNote = this.createNote.bind(this);
        this.noteChanged = this.noteChanged.bind(this);
        this.contactChanged = this.contactChanged.bind(this);
        this.createContact = this.createContact.bind(this);
        this.createInterview = this.createInterview.bind(this);
        this.interviewChanged = this.interviewChanged.bind(this);
    }

    componentDidMount() {
        // const app_id = this.props.match.params.id;
        
        this.setState({
            // app_id: app_id,
            refresh_key: Math.random()
        });

        axios.get('/api/applications/' + this.state.app_id).then(response => {
            console.log('Application response', response.data);
            let appAge = this.getApplicationAge(response.data.created_at);

            this.setState({
                application: response.data,
                contacts: response.data.company.contacts,
                // interviews: response.data.interviews,
                notes: response.data.notes,
                application_age: appAge
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

        axios.get('/api/applications/' + this.state.app_id +'/interviews').then(response => {
            this.setState({
                interviews: response.data,
                is_loading: false
            }, () => {
                console.log('interviews', this.state.interviews)
            });
        });
    }

    getApplicationAge(timestring) {
        let appAge = Date.now();
        let t = timestring.split(/[- :T.]/);
        let d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
        console.log('created at date', t, d, d.getTime(), appAge);
        appAge -= d.getTime();
        console.log('ms diff', appAge);
        appAge /= 1000;
        appAge /= 60;
        appAge /= 60;
        appAge = Math.floor(appAge / 24);
        console.log(appAge);

        return appAge;
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

    noteChanged(id) {
        this.setState({
            new_note: id
        });
    }

    contactChanged(contact) {
        let newContact = {
            name: contact.name,
            email: contact.email,
            address: contact.address,
            phone: contact.phone
        }

        this.setState({
            new_contact: newContact
        });
    }

    interviewChanged(interview) {
        let newInterview = {
            at_time: interview.interview_datetime,
            interview_type_id: interview.interview_type_id,
            application_id: this.state.application.id,
            location_id: interview.location_id
        }

        this.setState({
            new_interview: newInterview
        }, () => {console.log('interview changed', this.state.new_interview)});
    }

    createNote(event) {
        const { history } = this.props;
        if(this.state.new_note != '') {
            const note = {
                note: this.state.new_note,
                system_flag: false,
                application_id: this.state.app_id
            }
            axios.post('/api/notes/create', note).then(response => {
                this.hideCommentModal();
                let notes = this.state.notes;
                notes.push(response.data);
                this.setState({
                    notes: notes
                });
            });
        } else {
            // throw error
        }
    }

    createContact(event) {
        if(this.state.new_contact) {
            const contact = {
                name: this.state.new_contact.name,
                email: this.state.new_contact.email,
                phone: this.state.new_contact.phone,
                address: this.state.new_contact.address,
                company_id: this.state.application.company.id
            }
            console.log(contact);
    
            axios.post('/api/contacts', contact).then(response => {
                this.hideContactModal();
                let contacts = this.state.contacts;
                contacts.push(response.data);
                this.setState({
                    contacts: contacts
                });
            });
        }
    }

    createInterview(event) {
        if(this.state.new_interview) {
            const interview = {
                user_id: this.state.user_id,
                at_time: this.state.new_interview.at_time,
                interview_type_id: this.state.new_interview.interview_type_id,
                application_id: this.state.application.id,
                location_id: this.state.new_interview.location_id
            }

            axios.post('/api/interviews', interview).then(response => {
                console.log(response);
                this.hideInterviewModal();
                // @TODO: figure something better than this out
                window.location.reload();
            });
        }
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

    showContactModal() {
        this.setState({
            show_contact_modal: true
        })
    }

    hideContactModal() {
        this.setState({
            show_contact_modal: false
        })
    }

    render() {
        const { application, is_loading, app_id, show_comment_modal, show_interview_modal, show_contact_modal, notes, company, interviews } = this.state;
        return (
            <div className='container'>
            {!is_loading ? (
                <div>
                    <Modal show={show_comment_modal} onHide={this.hideCommentModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>New Note</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <NewNote 
                                application={application}
                                action={this.noteChanged}
                            />
                        </Modal.Body>
                        <div className='flex flex-row justify-end content-around mb-4'>
                            <button type="button" onClick={this.hideCommentModal} className="py-2 px-2 mx-2 basis-1/4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                                Close
                            </button>
                            <button type="button" onClick={this.createNote} className="py-2 px-2 mx-2 basis-1/2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                                Create Note
                            </button>
                        </div>
                    </Modal>

                    <Modal show={show_interview_modal} onHide={this.hideInterviewModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>New Interview</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <NewInterview 
                                userId={this.state.user_id}
                                application={application} 
                                action={this.interviewChanged}
                            />
                        </Modal.Body>
                        <div className='flex flex-row justify-end content-around mb-4'>
                            <button type="button" onClick={this.hideInterviewModal} className="py-2 px-2 mx-2 basis-1/4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Close
                            </button>
                            <button type="button" onClick={this.createInterview} className="py-2 px-2 mx-2 basis-1/2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Create Interview
                            </button>
                        </div>
                    </Modal>

                    <Modal show={show_contact_modal} onHide={this.hideContactModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>New Contact</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <NewContact 
                                company={application.company} 
                                applicationId={application.id}
                                action={this.contactChanged} 
                            />
                        </Modal.Body>
                        <div className='flex flex-row justify-end content-around mb-4'>
                            <button type="button" onClick={this.hideContactModal} className="py-2 px-2 mx-2 basis-1/4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Close
                            </button>
                            <button type="button" onClick={this.createContact} className="py-2 px-2 mx-2 basis-1/2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                Create Contact
                            </button>
                        </div>
                    </Modal>

                    <section>
                        <div className='flex flex-row flex-wrap mt-6'>
                            <div className="basis-full md:basis-3/4 flex items-baseline">
                                <span className='text-2xl mr-2'>
                                    { application.position }
                                </span>
                                <Link href={'/application/edit/' + application.id}>
                                    <i className='fas fa-edit mr-2'></i>
                                </Link>
                            </div>
                            <div className="basis-full md:basis-1/4 flex md:justify-end">
                                <div className="text-center w-full">
                                    <ApplicationStatus 
                                        appId={ app_id }
                                        status={ application.status }
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-row flex-wrap">
                            <div className="basis-full md:basis-1/2">
                                <h3 className='text-xl'>
                                    { application.company.name }
                                </h3>
                            </div>
                            <div className="basis-full md:basis-1/2 md:text-right">
                                <h3 className='text-xl'>
                                    {application.location.city}, {application.location.state} {application.app_zip}
                                </h3>
                            </div>
                        </div>

                        <div className="flex flex-row flex-wrap">
                            <div className="basis-full mt-6 md:pr-2 md:basis-1/3 text-center">
                                <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800">
                                    <div className="flex items-center text-center">
                                        <p className="text-lg w-full text-gray-700 dark:text-gray-50 ml-2">
                                            {this.state.keyword_matches.length} Keywords
                                        </p>
                                    </div>
                                    <div className="flex flex-col justify-start">
                                        <p className="text-gray-800 text-3xl text-center dark:text-white font-bold my-4">
                                            {this.percentageRound(this.state.keyword_matches.length / this.state.jd_keywords.length * 100, 1)}%
                                        </p>
                                        <div className="relative h-2 bg-gray-200 rounded">
                                            <div className='absolute top-0 h-2  left-0 rounded bg-green-500' style={{ width: this.percentageRound(this.state.keyword_matches.length / this.state.jd_keywords.length * 100, 0) + '%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="basis-full mt-6 md:px-2 md:basis-1/3 text-center">
                                <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800">
                                    <div className='app-sandwich'>Job post age: {application.post_age} days</div>
                                    <div className='app-sandwich'>Created {this.state.application_age} days ago</div>
                                    {application.applied_at ? (<div className='app-sandwich'>Applied: { application.applied_at }</div>) : null}
                                </div>
                            </div>
                            
                            <div className="basis-full mt-6 md:pl-2 md:basis-1/3 text-center">
                                <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800">
                                    {(application.posted_salary_min != undefined || application.posted_salary_max != undefined || application.requested_salary != undefined) ? (
                                    <div>
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
                                    ) : (
                                        <div><em>No salary information</em></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <Container className='application-section'>
                        <div className='jh-heading'>
                            Interviews
                            <Button variant='link' onClick={this.showInterviewModal}><i className="fas fa-plus-circle"></i></Button>
                        </div>
                        <InterviewsList applicationId={app_id} />
                    </Container>

                    <Container className='application-section'>
                        <div className='jh-heading'>
                            Contacts
                            <Button variant='link' onClick={this.showContactModal}><i className="fas fa-plus-circle"></i></Button>
                        </div>
                        <ContactsList 
                            companyId={application.company.id} 
                            contacts={this.state.contacts}
                        />
                    </Container>

                    <Container className='application-section'>
                        <div className='jh-heading'>Application Info</div>
                        <ApplicationInfo 
                            jobDesc={application.job_description}
                            resumeText={application.resume_text}
                            coverLetterText={application.coverletter_text}
                        />
                    </Container>

                    <Container className='application-section'>
                        <div className='jh-heading'>
                            Notes
                            <Button variant='link' onClick={this.showCommentModal}><i className="fas fa-plus-circle"></i></Button>
                        </div>
                        {notes.length > 0 ? (notes.map(note => (
                            <div
                                key={note.id}
                                className='application-note'
                            >
                                <div className='note-header'>{note.created_at} {note.system_flag ? (<span className='note-header-sys'>SYSTEM NOTE</span>) : null}</div>
                                {note.note}
                            </div>
                        ))) : (
                            <div><em>No notes</em></div>
                        )}
                    </Container>
                </div>

            ) : (
                <h3>loading</h3>
            )}
            </div>
            
        );
    }
}

export default ApplicationView;
