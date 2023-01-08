import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

import { backendBase, backendPort } from '../../../Configs/env';

async function loginUser(credentials) {
    try {
        const res = await fetch(`${backendBase}:${backendPort}/api/users/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
        return res.json();
    } catch (e) {
        console.log(e);
    }
}

async function signUpUser(credentials) {
    try {
        const res = await fetch(`${backendBase}:${backendPort}/api/users/signup`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
        return res.json();
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export default function LogIn({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();
    const handleLogIn = async e => {
        e.preventDefault();
        const res = await loginUser({
            username,
            password
        });
        if (res.status === 'success') {
            const token = res.message;
            setToken(token);
            setMessage();
        } else {
            setMessage(res.message);
        }
    }

    const handleSignUp = async e => {
        e.preventDefault();
        const res = await signUpUser({
            username,
            password
        });
        if (res.status === 'success') {
            setMessage('Sign up successful. Please log in.');
        } else {
            setMessage(res.message);
        }
    }
    return (
        <div className='login-wrapper'>
            <h2>Log In/Sign Up</h2>
            <form>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit" onClick={handleLogIn}>Log In</button>
                    <button type="submit" onClick={handleSignUp}>Sign Up</button>
                </div>
            </form>
            <p>{message}</p>
        </div>
    );
}

LogIn.propTypes = {
    setToken: PropTypes.func.isRequired
}