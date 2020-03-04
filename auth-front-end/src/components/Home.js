import React from 'react';
import {Link} from 'react-router-dom';

export default function Home() {
    return (
        <section>
            Create account => <Link to='/register'>Register</Link>
            <br />
            Or login as an existing user => <Link to='/login'>Login</Link>
            <br />
            See if you're logged in here => <Link to='/test'>Test</Link>
        </section>
    );
}