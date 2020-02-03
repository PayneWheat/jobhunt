import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InputCompany from './InputCompany';

class NewNote extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            application: props.application || null,
            is_loading: true
        };

    }
    componentDidMount() {
        this.setState({
            is_loading: false
        })
    }

    render() {
        const { is_loading } = this.state;
        return (
            
            <div>
            {!is_loading ? (
                <textarea 
                    name='newnote'
                    className='new-note'
                >

                </textarea>
            ) : (
                <h3>loading</h3>
            )}
            </div>
        );
    }
}


export default NewNote;