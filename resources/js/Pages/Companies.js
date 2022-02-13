import React, { Component } from 'react';
import { Head } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import CompaniesList from '@/Components/CompaniesList';

export default function Companies(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Applications</h2>}
        >
            <Head title="Companies" />
            
            <div className='container'>
                <h2 className='jh-heading'>Companies</h2>
                <CompaniesList />
            </div>
        </Authenticated>
    );
}
