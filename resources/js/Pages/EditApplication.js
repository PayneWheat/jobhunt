import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import Authenticated from '@/Layouts/Authenticated';
import NewApplication from '@/Components/NewApplication';

export default function EditApplication(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Application</h2>}
        >
            <Head title="Edit Application" />
            <NewApplication 
                userId={props.auth.user.id}
                edit={true} 
                app_id={props.application_id || undefined} 
                companyId={props.company_id} 
            />
        </Authenticated>
    );
}
