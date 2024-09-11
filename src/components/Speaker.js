import React, { useState, useEffect } from 'react';
import { ReactComponent as SpeakerOff } from '../assets/speaker-0.svg'; // SVG for OFF state
import { ReactComponent as SpeakerOn } from '../assets/speaker-1.svg'; // SVG for ON state
import './Speaker.css';
import '../common.css';
import Draggable from 'react-draggable';
import backgroundAudio from '../assets/anothermedium.ogg';

const Speaker = ({ isGame, isSpeakerOn, setIsSpeakerOn }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    const toggleSpeaker = () => {
        if (!isSpeakerOn && !isDragging) {
            setShowOverlay(true);
            setTimeout(() => {
                setShowOverlay(false);
            }, 4000); // 4 sec
        }
        setIsSpeakerOn(prevState => (isDragging ? prevState : !prevState));
    };

    const handleDrag = () => {
        setIsDragging(true);
    };

    const handleStop = () => {
        setTimeout(() => {
            setIsDragging(false);
        }, 100);
    };

    useEffect(() => {
        const audioElement = new Audio(backgroundAudio);
        audioElement.loop = true;

        if (isSpeakerOn) {
            audioElement.play();
        } else {
            audioElement.pause();
        }

        return () => {
            audioElement.pause();
            audioElement.currentTime = 0;
        };
    }, [isSpeakerOn]);

    return (
        <Draggable disable={!isGame} onDrag={handleDrag} onStop={handleStop}>
            <div className='speaker-container'>
                <div className={`speaker ${isSpeakerOn ? 'regular' : 'regular'}`} onClick={toggleSpeaker}>
                    {isSpeakerOn ? <SpeakerOn style={{ display: 'block', margin: '10px' }} /> : <SpeakerOff style={{ display: 'block', margin: '10px' }} />}
                </div>
                <div className={`overlay-message overlay-left-2nd overlay-top-small ${showOverlay ? '' : 'hide'}`} style={{ width: '292px' }}>
                    Playing: "Another Medium" - Toby Fox
                </div>
            </div>
        </Draggable>
    );
};

export default Speaker;