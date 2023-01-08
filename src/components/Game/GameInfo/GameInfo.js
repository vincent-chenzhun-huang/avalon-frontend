import React, { useState } from 'react';
import './GameInfo.css';
import { backendBase, backendPort } from '../../../Configs/env';
import { useParams } from 'react-router-dom';

async function getGameInfo(gameId, token, setMessage) {
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

export default function GameInfo({ token }) {
    const [gameId, setGameId] = useParams();
    console(gameId);
    const [message, setMessage] = useState('');
    console.log(getGameInfo(gameId, token, setMessage));

    return (
        <div className="game-info-wrapper">
            Game info in console
        </div>
    )
}