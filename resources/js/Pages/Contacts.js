import React, { Component } from 'react';
import axios from 'axios';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import ContactsList from '@/Components/ContactsList';

export default function Contacts(props) {
    return (
            <Authenticated
                auth={props.auth}
                errors={props.errors}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Contacts</h2>}
            >
            <Head title="Contacts" />
            
            <div className="container">
                <ContactsList />
            </div>
        </Authenticated>
    );
}
