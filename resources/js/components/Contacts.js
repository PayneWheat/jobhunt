import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ContactsList from './ContactsList';

class Contacts extends Component {
    render() {
        return (
            <div className="container">
                <h2 className='jh-heading'>Contacts</h2>
                <ContactsList />
            </div>
        );
    }
}

export default Contacts;