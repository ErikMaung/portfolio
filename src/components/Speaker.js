import React, { useState } from 'react';
import { ReactComponent as SpeakerOff } from '../assets/speaker-0.svg'; // SVG for OFF state
import { ReactComponent as SpeakerOn } from '../assets/speaker-1.svg'; // SVG for ON state
import './Speaker.css';
import Draggable from 'react-draggable';

const Speaker = ({ isGame }) => {
    const [isOn, setIsOn] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const toggleSpeaker = () => {
        console.log("TOGGLED");
        setIsOn(prevState => isDragging ? prevState : !prevState);
        // double-toggle the prevState upon dragging to create illusion that,
        // while dragging, user doesn't accidentally toggle speaker
    };

    const handleDrag = () => {
        setIsDragging(true);
    }

    const handleStop = () => {
        setTimeout(() => {
            setIsDragging(false);
        }, 100);
    }

    return (
        <Draggable disable={!isGame} onDrag={handleDrag} onStop={handleStop}>
            <div className={`speaker ${true ? 'regular' : 'regular'}`} onClick={toggleSpeaker}>
                {isOn ? <SpeakerOn style={{ display: 'block', margin: '10px' }} /> : <SpeakerOff style={{ display: 'block', margin: '10px' }} />}
            </div>
        </Draggable>
    );
}

export default Speaker;