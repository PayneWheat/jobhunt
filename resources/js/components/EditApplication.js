
import React, { Component } from 'react';
import NewApplication from './NewApplication';

class EditApplication extends Component {
    constructor(props) {
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