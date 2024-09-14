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
    const [audioElement, setAudioElement] = useState(null); // Added state for audio element

    // Initialize audio element and set loop
    useEffect(() => {
        const audio = new Audio(backgroundAudio);
        audio.loop = true;
        setAudioElement(audio); // Store audio element in state for later use

        return () => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        };
    }, []);

    // Function to toggle speaker state and show overlay
    const toggleSpeaker = () => {
        if (!isSpeakerOn && !isDragging) {
            setShowOverlay(true);
            setTimeout(() => {
                setShowOverlay(false);
            }, 4000); // 4 sec
        }
        setIsSpeakerOn(prevState => (isDragging ? prevState : !prevState));
    };

    // Handle drag start to set dragging state
    const handleDrag = () => {
        setIsDragging(true);
    };

    // Handle drag stop to reset dragging state after a short delay
    const handleStop = () => {
        setTimeout(() => {
            setIsDragging(false);
        }, 100);
    };

    // Handle user interaction (click or touch) to toggle audio play/pause
    const handleInteraction = () => {
        if (audioElement) {
            if (isSpeakerOn) {
                audioElement.pause();
            } else {
                audioElement.play().catch(error => {
                    // Autoplay was prevented
                    console.error('Failed to play audio:', error);
                });
            }
        }
    };

    // Effect to play or pause audio based on speaker state
    useEffect(() => {
        if (audioElement) {
            if (isSpeakerOn) {
                audioElement.play().catch(error => {
                    // Autoplay was prevented
                    console.error('Failed to play audio:', error);
                });
            } else {
                audioElement.pause();
            }
        }
    }, [isSpeakerOn, audioElement]);

    return (
        <Draggable disable={!isGame} onDrag={handleDrag} onStop={handleStop}>
            <div className='speaker-container' onClick={toggleSpeaker} onTouchEnd={toggleSpeaker}>
                <div className={`speaker ${isSpeakerOn ? 'regular-on' : 'regular-off'}`}>
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
