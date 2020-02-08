import React, { Component } from 'react';
import ApplicationsList from './ApplicationsList';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

class ApplicationInfo extends Component {
    constructor(props) {
        super();
        this.state = {
            job_description: props.jobDesc || "No Job Description",
            resume_text: props.resumeText || "No Resume Submitted",
            coverletter_text: props.coverLetterText || "No Cover Letter Submitted"
        }
    }
    componentWillMount() {

    }
    render() {
        return (
            <section className="application-tabs">
                <Tabs defaultActiveKey="description" id="application-tabs">
                    <Tab eventKey="description" title="Job Description">
                        <article className='application-info-output'>
                            {this.state.job_description}
                        </article>
                    </Tab>
                    <Tab eventKey="resume" title="Submitted Resume">
                        <article className='application-info-output'>
                            {this.state.resume_text}
                        </article>
                    </Tab>
                    <Tab eventKey="coverletter" title="Cover Letter">
                    <article className='application-info-output'>
                        {this.state.coverletter_text}
                    </article>
                    </Tab>
                </Tabs>
            </section>
        );
    }
}
export default ApplicationInfo;