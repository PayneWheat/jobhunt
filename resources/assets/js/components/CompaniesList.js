import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class CompaniesList extends Component {
    constructor() {
        super();
        this.state = {
            companies: [],
            is_loading: true
        };

    }
    componentDidMount() {
        axios.get('/api/companies').then(response => {
            console.log(response);
            let co = response.data.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
            this.setState({
                companies: co,
                is_loading: false
            });
        });
    }
    render() {
        const { companies, is_loading } = this.state;
        return (
            
            <div className='container'>
            {!is_loading ? (
                <div className='list-container'>
                    {companies.map(company=>(
                        <Link
                            to={`/company/${company.id}`}
                            className='list-row'
                            key={company.id}
                        >
                        {company.name}
                        </Link>
                    ))}
                </div>
            ) : (
                <h3>loading</h3>
            )}
            </div>
        );
    }
}


export default CompaniesList;