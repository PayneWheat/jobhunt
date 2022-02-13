import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import CompanyView from '@/Components/CompanyView';

export default function Company(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Company</h2>}
        >
            <Head title="Company" />
            <CompanyView companyId={props.company_id} />
        </Authenticated>
    );
}