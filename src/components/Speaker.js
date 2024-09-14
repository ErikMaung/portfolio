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

    useEffect(() => {
        const handleClick = () => {
            if (!isSpeakerOn && !isDragging) {
                setShowOverlay(true);
                setTimeout(() => {
                    setShowOverlay(false);
                }, 4000); // 4 sec
            }
            setIsSpeakerOn(prevState => (isDragging ? prevState : !prevState));
        };

        const speakerContainer = document.getElementById('speaker-container');
        if (speakerContainer) {
            speakerContainer.addEventListener('click', handleClick);
            speakerContainer.addEventListener('touchend', handleClick);
        }

        return () => {
            if (speakerContainer) {
                speakerContainer.removeEventListener('click', handleClick);
                speakerContainer.removeEventListener('touchend', handleClick);
            }
        };
    }, [isDragging, isSpeakerOn, setIsSpeakerOn]);

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

    const handleDrag = () => {
        setIsDragging(true);
    };

    const handleStop = () => {
        setTimeout(() => {
            setIsDragging(false);
        }, 100);
    };

    return (
        <Draggable disable={!isGame} onDrag={handleDrag} onStop={handleStop}>
            <div id="speaker-container" className='speaker-container'>
                <div className='speaker regular'>
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