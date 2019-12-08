import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import ApplicationsList from './ApplicationsList';
import NewApplication from './NewApplication';
import Application from './Application';
import EditApplication from './EditApplication';
import Companies from './Companies';
import Company from './Company';
import EditCompany from './EditCompany';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={ApplicationsList} />
                        <Route path='/create' component={NewApplication} />
                        <Route exact path='/application/:id' component={Application} />
                        <Route exact path='/application/edit/:id' component={EditApplication} />
                        <Route path='/applications' component={ApplicationsList} />
                        <Route path='/companies' component={Companies} />
                        <Route exact path='/company/:id' component={Company} />
                        <Route exact path='/company/edit/:id' component={EditCompany} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
