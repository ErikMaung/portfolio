import React from 'react';
import { Button } from '@mantine/core';
import { useState } from 'react';
import money from '../common.js';
import './IncrementButton.css';
import '../common.css';

function IncrementButton({ type, scaleValue, incrementAmt, wantsToPlay, setWantsToPlay, setPoints, points }) {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleincrement = (event) => {
    if (event.shiftKey) {
      setPoints(prevPoints => prevPoints - incrementAmt);
    } else {
      setPoints(prevPoints => prevPoints + incrementAmt);
    }
    if (points >= 24) {
      if (!wantsToPlay) {
        setShowOverlay(true);
        setTimeout(() => {
          setShowOverlay(false);
        }, 2000); // 2 sec 
        setWantsToPlay(true);
      } else {
        // setWantsToPlay(false); // debugging
      }
    } else if (points < -1) {
      setWantsToPlay(false); // debugging
    }
  }

  return (
    <>
      <div className={`overlay-message overlay-center overlay-middle ${showOverlay ? '' : 'hide'}`}>
        Shop Unlocked!
      </div>
      <Button
        className={`custom-button ${type}`}
        radius="xl"
        size="xl"
        style={{
          '--scale-value': scaleValue,
        }}
        onClick={handleincrement}
      >
        ${money(points)}
      </Button>
    </>)
};

export default IncrementButton;
