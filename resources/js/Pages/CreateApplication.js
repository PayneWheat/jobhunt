import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import NewApplication from '@/Components/NewApplication';

export default function CreateApplication(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Application</h2>}
        >
            <Head title="Create Application" />

            <NewApplication userId={props.auth.user.id} />
        </Authenticated>
    );
}
