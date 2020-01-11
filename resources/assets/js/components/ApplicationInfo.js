import React, { Component } from 'react';
import ApplicationsList from './ApplicationsList';

class ApplicationInfo extends Component {
    constructor(props) {
        super();
        this.state = {
            job_description: props.jobDesc || "SOMETHING WENT WRONG",
            resume_text: props.resumeText || "SOMETHING WENT WRONG",
            coverletter_text: props.coverLetterText || "SOMETHING WENT WRONG",
            openTab: null
        }
        this.openTab = this.openTab.bind(this);
    }
    componentWillMount() {
        this.setState({
            openTab: 1
        });
    }
    openTab(event) {
        console.log("hello", event.target.attributes.getNamedItem('data-tab').value);
        let tabId = event.target.attributes.getNamedItem('data-tab').value;
        this.setState({
            openTab: tabId
        })
        
    }
    render() {
        return (
            <div>
                <nav className='application-info-nav'>
                    <button className='app-collapsable-buttons' onClick={this.openTab} data-tab='1'>Job Description</button>
                    <button className='app-collapsable-buttons' onClick={this.openTab} data-tab='2'>Resume</button>
                    <button className='app-collapsable-buttons' onClick={this.openTab} data-tab='3'>Cover Letter</button>
                </nav>
                {this.state.openTab == 1 ? (<article className='application-info-output'><h2 className='jh-heading'>Job Description</h2>{this.state.job_description}</article>) : null}
                {this.state.openTab == 2 ? (<article className='application-info-output'><h2 className='jh-heading'>Submitted Resume</h2>{this.state.resume_text}</article>) : null}
                {this.state.openTab == 3 ? (<article className='application-info-output'><h2 className='jh-heading'>Submitted Cover Letter</h2>{this.state.coverletter_text}</article>) : null}
            </div>
        );
    }
}
export default ApplicationInfo;