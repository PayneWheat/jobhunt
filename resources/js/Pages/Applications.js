import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import ApplicationsList from '@/Components/ApplicationsList';

export default function Applications(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Applications</h2>}
        >
            <Head title="Applications" />

            <ApplicationsList userId={props.auth.user.id} />
        </Authenticated>
    );
}
