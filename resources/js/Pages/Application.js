import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import ApplicationView from '@/Components/ApplicationView';

export default function Application(props) {
    console.log('Application page. Props:', props);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Applications</h2>}
        >
            <Head title="Application" />

            <ApplicationView applicationId={props.application_id} userId={props.auth.user.id} />
        </Authenticated>
    );
}