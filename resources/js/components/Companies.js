import React, { Component } from 'react';
import CompaniesList from './CompaniesList';
class Companies extends Component {
    render() {
        return (
            <div className='container'>
                <h2 className='jh-heading'>Companies</h2>
                <CompaniesList />
            </div>
        );
    }
}
export default Companies;