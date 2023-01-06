import React from 'react';
import PropTypes from 'prop-types';
import './Logout.css';

export default function Logout({ setToken }) {
    const handSubmit = async e => {
        e.preventDefault();
        setToken();
    };
    return (
        <div className='logout-wrapper'>
            <form onSubmit={handSubmit}>
                <div>
                    <button type="submit">Log Out</button>
                </div>
            </form>
        </div>
    )
}