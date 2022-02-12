import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Applications from './Applications';
import NewApplication from './NewApplication';
import Application from './Application';
import EditApplication from './EditApplication';
import Companies from './Companies';
import Company from './Company';
import EditCompany from './EditCompany';
import NewInterview from './NewInterview';
import Interviews from './Interviews';
import Contacts from './Contacts';
import Home from './Home';
//import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/create' component={NewApplication} />
                        <Route exact path='/application/:id' component={Application} />
                        <Route exact path='/application/edit/:id' component={EditApplication} />
                        <Route exact path='/application/:id/add/interview' component={NewInterview} />
                        <Route path='/applications' component={Applications} />
                        <Route path='/companies' component={Companies} />
                        <Route exact path='/company/:id' component={Company} />
                        <Route exact path='/company/edit/:id' component={EditCompany} />
                        <Route path='/interviews' component={Interviews} />
                        <Route path='/contacts' component={Contacts} />

                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
