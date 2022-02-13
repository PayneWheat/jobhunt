import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import ApplicationsList from '../Components/ApplicationsList';
import InterviewsList from '../Components/InterviewsList';

export default function Home(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Home" />
            <div className='container'>
                <ApplicationsList />
                
                <h2 className='jh-heading'>Interviews</h2>
                <InterviewsList />
            </div>
        </Authenticated>
    );
}