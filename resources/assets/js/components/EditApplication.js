
import React, { Component } from 'react';
import NewApplication from './NewApplication';

class EditApplication extends Component {
    constructor(props) {
        console.log("EditApp constructor", props.match.params.id);
        super();
        this.state = {
            app_id: props.match.params.id
        }
    }
    render() {
        return (
            <NewApplication edit={true} app_id={this.state.app_id}/>
        );
    }
}

export default EditApplication;