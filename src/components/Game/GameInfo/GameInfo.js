import React, { useState } from 'react';
import './GameInfo.css';
import { backendBase, backendPort } from '../../../Configs/env';

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