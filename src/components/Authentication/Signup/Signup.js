import React from 'react';

export default function SignUp() {
    return (
        <div className='signup-wrapper'>
            <h2>Sign Up</h2>
            <form>
                <label>
                    <p>Username</p>
                    <input type="text" />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" />
                </label>
                <div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    )
}