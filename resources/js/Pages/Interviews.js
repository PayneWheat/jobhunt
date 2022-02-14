import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import InterviewsList from '@/Components/InterviewsList';

export default function Interviews(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Interviews</h2>}
        >
            <Head title="Interviews" />

            <div className="container">
                <InterviewsList />
            </div>
        </Authenticated>
    );
}