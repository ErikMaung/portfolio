import React from 'react';
import { Button } from '@mantine/core';
import { useState } from 'react';
import money from '../common.js';
import './IncrementButton.css';

function IncrementButton({ type, scaleValue, incrementAmt, setWantsToPlay, setPoints, points }) {
  const handleincrement = (event) => {
    if (event.shiftKey) {
      setPoints(prevPoints => prevPoints - incrementAmt);
    } else {
      setPoints(prevPoints => prevPoints + incrementAmt);
    }
    if (points >= 24) setWantsToPlay(true);
  }

  return <Button
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
};

export default IncrementButton;
