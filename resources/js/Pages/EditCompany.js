import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import EditCompany from '@/Components/EditCompany';

export default function Company(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Company</h2>}
        >
            <Head title="Edit Company" />
            
            <EditCompany companyId={props.company_id} />
        </Authenticated>
    );
}