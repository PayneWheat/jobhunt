import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <nav className="navbar navbar-expand-md navbar-light navbar-laravel">
        <div className="container">
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
        </div>
    </nav>
);
export default Header;