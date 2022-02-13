import React, { Component } from 'react';
import axios from 'axios';
// import InputCompany from '@/Components/InputCompany';

class NewNote extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            application: props.application || null,
            is_loading: true,
            value: ''
        };
        this.onChange = this.onChange.bind(this);

    }

    componentDidMount() {
        this.setState({
            is_loading: false
        })
    }

    onChange(event) {
        this.setState({
            value: event.target.value
        }, ()=>{this.props.action(this.state.value);});
    }

    render() {
        const { is_loading } = this.state;
        return (
            <div>
            {!is_loading ? (
                <textarea 
                    name='newnote'
                    className='new-note'
                    onChange={this.onChange}
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