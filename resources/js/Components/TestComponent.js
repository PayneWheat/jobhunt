import React, { Component } from 'react';
import { Link } from '@inertiajs/inertia-react';

class TestComponent extends Component {
    render() {
        return (
            <div>
                Hello hello world
                <Link href="home">Home</Link>
            </div>
        );
    }
} 

export default TestComponent;