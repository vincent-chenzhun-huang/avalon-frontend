import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EnterGame.css';
import { backendBase, backendPort } from '../../../Configs/env';

async function checkGame(gameId, token, setMessage) {
    try {
        if (gameId === '') {
            setMessage('Game ID is required');
            return {
                status: 'error',
                message: 'Game ID is required'
            };
        }
        const res = await fetch(`${backendBase}:${backendPort}/api/games/${gameId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            });
        if (res.status === 'error') {
            setMessage(res.message);
        }
        return res.json();
    } catch (e) {
        console.log(e);
        setMessage(e.message);
        return {
            status: 'error',
            message: e.message
        };
    }
}

export default function EnterGame({ token }) {
    const [gameId, setGameId] = useState('');
    const [message, setMessage] = useState();
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await checkGame(gameId, token, setMessage);
        if (res.status === 'success') {
            navigate(`/game/${gameId}`);
        } else {
            setMessage(res.message);
        }
    }

    return (
        <div className="enter-game-wrapper">
            <form onSubmit={handleSubmit}>
                <label key='game_id'>
                    <p>Game ID</p>
                    <input type="text" onChange={e => {setGameId(e.target.value); console.log(gameId)}} />
                </label>
                <div>
                    <button type="submit">Enter Game</button>
                </div>
            </form>
            <p>{message}</p>
        </div>
    )



}