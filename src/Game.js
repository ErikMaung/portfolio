import React, { useState, useEffect } from 'react';
import './Game.css';
import './common.css'
import RngButton from './components/RngButton';
import IncrementButton from './components/IncrementButton';
import CustomButton from './components/CustomButton';
import Shop from './components/Shop';
import { Container } from '@mantine/core';

const Game = ({ scaleValue }) => {
    const [points, setPoints] = useState(0.0);
    const [wantsToPlay, setWantsToPlay] = useState(false);
    const [incrementAmt, setIncrementAmt] = useState(1.0);
    const [mps, setMps] = useState(0.0);
    const [shopPrices, setShopPrices] = useState([25.0, 100.0]);

    // SAVE FUNCTIONALITY
    const [loaded, setLoaded] = useState(false); // track if game data has been loaded
    const [fileInputKey, setFileInputKey] = useState(Date.now()); // Key to reset file input
    const [importedMessage, setImportedMessage] = useState('');
    const [exportedMessage, setExportedMessage] = useState('');

    const saveGame = () => {
        const gameState = {
            points,
            wantsToPlay,
            incrementAmt,
            mps,
            shopPrices
        };
        localStorage.setItem('gameState', JSON.stringify(gameState));
    };

    const loadGame = () => {
        const savedGameState = localStorage.getItem('gameState');
        if (savedGameState) {
            const parsedGameState = JSON.parse(savedGameState);
            setPoints(parsedGameState.points);
            setWantsToPlay(parsedGameState.wantsToPlay);
            setIncrementAmt(parsedGameState.incrementAmt);
            setMps(parsedGameState.mps);
            setShopPrices(parsedGameState.shopPrices);
        }
        setLoaded(true); // mark game data as loaded
    };

    const exportSave = () => {
        const gameState = {
            points,
            wantsToPlay,
            incrementAmt,
            mps,
            shopPrices
        };
        const jsonGameState = JSON.stringify(gameState);
        const blob = new Blob([jsonGameState], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'erik\'s-game-save-file.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setExportedMessage('Save Downloaded!');
        setTimeout(() => {
            setExportedMessage('');
        }, 2000);
        URL.revokeObjectURL(url);
    };

    const importSave = (event) => {
        const file = event.target.files[0]; // Access the first file from the event
        const reader = new FileReader();
        reader.onload = (event) => {
            const importedGameState = JSON.parse(event.target.result);
            setPoints(importedGameState.points);
            setWantsToPlay(importedGameState.wantsToPlay);
            setIncrementAmt(importedGameState.incrementAmt);
            setMps(importedGameState.mps);
            setShopPrices(importedGameState.shopPrices);
            setImportedMessage('Save Loaded!');
            setTimeout(() => {
                setImportedMessage('');
            }, 2000);
            setFileInputKey(Date.now()); // Reset file input key to clear its value
        };
        reader.readAsText(file); // Read the file as text
    };

    useEffect(() => {
        // Load game data on component mount
        loadGame();
    }, []);

    useEffect(() => {
        // Auto-save whenever these state values change, but only after initial load
        if (loaded) {
            saveGame();
        }
    }, [points, wantsToPlay, incrementAmt, mps, shopPrices, loaded]);
    // SAVE FUNCTIONALITY

    useEffect(() => {
        let lastUpdateTime = Date.now();
        let timerId;

        const updatePoints = () => {
            const now = Date.now();
            const deltaTime = now - lastUpdateTime;
            const pointsToAdd = (mps / 1000) * deltaTime;
            setPoints((prevPoints) => prevPoints + pointsToAdd);
            lastUpdateTime = now;
            timerId = setTimeout(updatePoints, 50);
        };

        if (wantsToPlay) {
            timerId = setTimeout(updatePoints, 50);
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [wantsToPlay, mps]);

    return (
        <Container>
            <div className="button-group vertical scaling" >
                <RngButton type={"primary"} scaleValue={scaleValue} />
                <IncrementButton type={"success"} scaleValue={scaleValue} incrementAmt={incrementAmt} wantsToPlay={wantsToPlay} setWantsToPlay={setWantsToPlay} setPoints={setPoints} points={points} />
            </div >
            {wantsToPlay ? <div className="button-group">
                <Shop scaleValue={scaleValue} setIncrementAmt={setIncrementAmt} incrementAmt={incrementAmt} mps={mps} setMps={setMps} points={points} setPoints={setPoints} shopPrices={shopPrices} setShopPrices={setShopPrices} />
            </div> : undefined}
            <div className="button-group">
                <CustomButton label={exportedMessage ? exportedMessage : 'Export Save'} type={exportedMessage ? 'success' : 'secondary'} onClick={exportSave} scaleValue={scaleValue}></CustomButton>
                <label className={`custom-button ${importedMessage ? 'success' : 'secondary'}`} style={{'--scale-value': scaleValue,}}>
                    {importedMessage ? importedMessage : 'Import Save'}
                    <input
                        key={fileInputKey} type="file"
                        onChange={importSave} style={{ display: 'none' }}
                    />
                </label>
            </div>
        </Container>
    )
};

export default Game;