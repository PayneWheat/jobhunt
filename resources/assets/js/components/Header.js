import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button';

const Header = () => (
    <nav className="navbar navbar-expand-md navbar-light navbar-laravel">
        <div className="container">
            {/*
            <Link className="navbar-brand" to="/">JobHunt</Link>
            <div className="dropdown navbar-nav">
                <a href="#" className="dropdown-toggle btn btn-light" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="caret"></span></a>

                <ul className="dropdown-menu">
                    <li><Link to="/applications">Applications</Link></li>
                    <li><Link to="/companies">Companies</Link></li>
                    <li><Link to="/interviews">Interviews</Link></li>
                    <li><Link to="/contacts">Contacts</Link></li>
                    <li><Link to="/offers">Offers</Link></li>
                </ul>

            </div>
            */}
            <Dropdown as={ButtonGroup}>
                <Button>JobHunt</Button>
                <Dropdown.Toggle split></Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="/applications">Application</Dropdown.Item>
                    <Dropdown.Item href="/applications">Application</Dropdown.Item>
                    <Dropdown.Item href="/applications">Application</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    </nav>
);
export default Header;