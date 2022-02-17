import axios from 'axios';
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

class NewContact extends Component {
    constructor(props) {
        super();

        this.state = {
            is_loading: true,
            company: props.company || null,
            name: '',
            email: '',
            phone: '',
            address: '',
            application_id: props.applicationId || null
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreateNewContact = this.handleCreateNewContact.bind(this);
    }

    componentDidMount() {
        this.setState({
            is_loading: false,
        });
    }
    
    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {this.props.action(this.state)});
    }

    handleCreateNewContact(event) {
        event.preventDefault();
        const { history } = this.props;

        const contact = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            company_id: this.state.company.id
        }
        console.log(contact);

        axios.post('/api/contacts', contact).then(response => {
            // history.push('/application/' + this.state.application.id)
            console.log(response);
        });
    }

    render() {
        const { is_loading, company } = this.state;

        return (
            <Container>
                {!is_loading ? (
                    <Form onSubmit={this.handleCreateNewContact}>
                        <Form.Group>
                            <Form.Label htmlFor='name'>Name</Form.Label>
                            <Form.Control 
                                id='name'
                                type='text'
                                /*className={`form-control ${this.hasErrorFor('position') ? 'is-invalid' : ''}`}*/
                                name='name'
                                value={this.state.name}
                                onChange={this.handleFieldChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor='email'>Email</Form.Label>
                            <Form.Control
                                id='email'
                                type='text'
                                /*className={`form-control ${this.hasErrorFor('position') ? 'is-invalid' : ''}`}*/
                                name='email'
                                value={this.state.email}
                                onChange={this.handleFieldChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor='phone'>Phone</Form.Label>
                            <Form.Control
                                id='phone'
                                type='text'
                                /*className={`form-control ${this.hasErrorFor('position') ? 'is-invalid' : ''}`}*/
                                name='phone'
                                value={this.state.phone}
                                onChange={this.handleFieldChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor='address'>Address</Form.Label>
                            <Form.Control
                                id='address'
                                type='text'
                                /*className={`form-control ${this.hasErrorFor('position') ? 'is-invalid' : ''}`}*/
                                name='address'
                                value={this.state.address}
                                onChange={this.handleFieldChange}
                            />
                        </Form.Group>
                        {!company ? (
                        <Form.Group>
                            <Form.Label htmlFor='address'>Company</Form.Label>
                            <Form.Control
                                id='address'
                                type='text'
                                /*className={`form-control ${this.hasErrorFor('position') ? 'is-invalid' : ''}`}*/
                                name='address'
                                value={this.state.address}
                                onChange={this.handleFieldChange}
                            />
                        </Form.Group>
                        ) : null}
                        {/* <Button type='submit'>Create Contact</Button> */}
                    </Form>
                ) : (
                    <h3>Loading</h3>
                )}
            </Container>
        )
    }    
}

export default NewContact;