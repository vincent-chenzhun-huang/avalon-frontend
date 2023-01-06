import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

const backendBase = process.env.BACKEND_BASE || 'http://localhost';
const backendPort = process.env.BACKEND_PORT || '8000';

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
        throw e;
    }

}

export default function LogIn({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const handleSubmit = async e => {
        e.preventDefault();
        const res = await loginUser({
            username,
            password
        });
        console.log(username);
        console.log(password);
        if (res.status === 'success') {
            const token = res.message;
            setToken(token);
        } else {
            console.log(res.message);
        }
    }
    return (
        <div className='login-wrapper'>
            <h2>Log In/Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Log In</button>
                </div>
            </form>
        </div>
    )
}

LogIn.propTypes = {
    setToken: PropTypes.func.isRequired
}