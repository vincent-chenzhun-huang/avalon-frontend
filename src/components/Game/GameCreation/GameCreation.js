import React, { useState } from "react";
import PropTypes from 'prop-types';
import './GameCreation.css';
import { backendBase, backendPort, numPlayers } from "../../../Configs/env";

async function createGame(playerNames, token, setMessage) {
    try {
        const res = await fetch(`${backendBase}:${backendPort}/api/games/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({players: playerNames})
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


export default function GameCreation({ token }) {
    const [playerNames, setPlayerNames] = useState(Array(numPlayers).fill());
    const [message, setMessage] = useState();

    const handlePlayerInput = (e, i) => {
        const newPlayerNames = [...playerNames];
        newPlayerNames[i] = e.target.value;
        setPlayerNames(newPlayerNames);
    }
    const renderPlayerInputs = (numPlayers) => {
        const inputs = [];
        for (let i = 0; i < numPlayers; i++) {
            inputs.push(
                <label key={`Player: ${i+1}`}>
                    <p>Player: {i+1}</p>
                    <input type="text" onChange={e => handlePlayerInput(e, i)}/>
                </label>
            );
        }
        return inputs;
    }
    const handleCreateGame = async e => {
        e.preventDefault();
        const res = await createGame(playerNames, token, setMessage);
        if (res.status === 'success') {
            setMessage('created game');
        } else {
            setMessage(res.message);
        }
    }

    return (
        <div className="create-game-wrapper">
            <h1>Create Game</h1>
            <form onSubmit={handleCreateGame}>
                {renderPlayerInputs(numPlayers)}
                <div>
                    <button type="submit">Create Game</button>
                </div>
            </form>
            <p>{message}</p>
        </div>
    );
}