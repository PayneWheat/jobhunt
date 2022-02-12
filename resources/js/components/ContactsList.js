import axios from 'axios';
import React, { Component } from 'react';

class ContactsList extends Component {
    constructor(props) {
        console.log('ContactsList', props);
        super();
        this.state = {
            contacts: props.contacts || null,
            company_id: props.companyId || null,
            is_loading: true,
            exclude_company: null
        }
    }

    componentDidMount() {
        console.log('ContactsList::componentDidMount', this.state.company_id);
        if(this.state.contacts === null) {
            if(this.state.company_id) {
                axios.get('/api/contacts/company/' + this.state.company_id).then(response => {
                    this.setState({
                        contacts: response.data,
                        is_loading: false,
                        exclude_company: true
                    }, () => {
                        console.log('contacts for company', this.state.contacts)
                    });
                });
            } else {
                axios.get('/api/contacts').then(response => {
                    this.setState({
                        contacts: response.data,
                        is_loading: false,
                        exclude_company: false
                    }, () => {
                        console.log('contacts', this.state.contacts)
                    });
                });
            }
        } else {
            console.log('contacts passed in a prop', this.state.contacts);
            this.setState({
                is_loading: false,
                exclude_company: true
            });
        }
    }

    render() {
        const { is_loading, contacts, exclude_company } = this.state;
        console.log('ContactList::render', contacts);
        return (
            <div className="contact-list">
                {!is_loading ? 
                    (contacts.length > 0 ? 
                        (contacts.map(contact => (
                            <div className='list-row' key={contact.id}>
                                {!exclude_company ? (
                                    <div>{contact.company.name}</div>
                                ) : null}
                                <div>{contact.name}: {contact.email}{contact.phone ? ', ' + contact.phone : null}</div>
                            </div>
                        ))
                    ) : (
                        <div><em>No Contacts</em></div>
                    )
                ) : (
                    <h3>loading</h3>
                )}
            </div>
        );
    }
}

export default ContactsList;