import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import ApplicationsList from './ApplicationsList';
import NewApplication from './NewApplication';
import Application from './Application';
import EditApplication from './EditApplication';

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
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));
