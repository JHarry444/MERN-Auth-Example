import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { clone, merge } from 'lodash';
import { JWT, PROTOCOL, LOCATION, USER_URL, LOGIN_URL } from '../config/config.json';

export default function LoginForm(props) {

    const [validated, setValidated] = useState(false);
    const [userDetails, setDetails] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = event => {
        const form = event.currentTarget;
        event.preventDefault();
        if (!form.checkValidity()) {
            event.stopPropagation();
        } else {
            axios.post(`${PROTOCOL}${LOCATION}${USER_URL}${LOGIN_URL}`, userDetails)
                .then(res => {
                    debugger;
                    localStorage.setItem(JWT, res.data);
                    props.history.push('/test');
                })
                .catch(err => {
                    console.log('login failed', err);
                    setError(err.response.data);
                });
        }
        setValidated(true);
    };

    const handleChange = ({ target: { name, value } }) => {
        const tempDetails = clone(userDetails);
        merge(tempDetails, { [name]: value });
        setDetails(tempDetails);
    }

    return (
        <section>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUser">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name='username' placeholder="Username" value={userDetails.username} onChange={handleChange} required={true} />
                    <Form.Control.Feedback type='invalid'>Please enter a username</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' type="email" placeholder="Enter email" value={userDetails.email} onChange={handleChange} required={true} />
                    <Form.Control.Feedback type='invalid'>Please enter a valid email</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" value={userDetails.password} onChange={handleChange} required={true} />
                    <Form.Control.Feedback type='invalid'>Please enter a password</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                {error &&
                    <Alert variant="danger">
                        {error}
                    </Alert>}
            </Form>
        </section>
    );
}