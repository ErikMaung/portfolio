import React from 'react';
import { Button } from '@mantine/core';
import { useState } from 'react';
import './RngButton.css';

function RngButton({ type, scaleValue }) {
  const status = 'Random Number 1-100';
  const [rng, setRng] = useState(status);
  const min = 1;
  const max = 100;
  const handleRng = (event) => {
    if (event.shiftKey) {
      setRng(status);
    } else
      setRng(Math.floor((max - min) * Math.random()) + min);
  }

  return <Button
    className={`custom-button ${type}`}
    radius="xl"
    size="xl"
    style={{
      '--scale-value': scaleValue,
    }}
    onClick={handleRng}
  >
    {rng}
  </Button>
};

export default RngButton;
