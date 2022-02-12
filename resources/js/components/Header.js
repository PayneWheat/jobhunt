import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button';

const Header = () => (
    <nav className="navbar navbar-expand-md navbar-light navbar-laravel">
        <div className="container">
            <Dropdown as={ButtonGroup}>
                <LinkContainer to="/">
                    <Button>JobHunt</Button>
                </LinkContainer>
                <Dropdown.Toggle split></Dropdown.Toggle>
                <Dropdown.Menu>
                    <LinkContainer to="/applications">
                        <Dropdown.Item>Applications</Dropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/companies">
                        <Dropdown.Item >Companies</Dropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/interviews">
                        <Dropdown.Item>Interviews</Dropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/contacts" >
                        <Dropdown.Item>Contacts</Dropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/offers" >
                        <Dropdown.Item>Offers</Dropdown.Item>
                    </LinkContainer>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    </nav>
);
export default Header;