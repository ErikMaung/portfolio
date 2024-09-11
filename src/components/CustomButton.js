import React from 'react';
import { Button } from '@mantine/core';
import './CustomButton.css';

function CustomButton({ label, type, scaleValue, onClick, href }) {
  return href ? (
    <Button
      className={`custom-button ${type}`}
      radius="xl"
      size="xl"
      style={{
        '--scale-value': scaleValue,
      }}
      component="a"
      href={href}
      rel="noopener noreferrer"
    >
      {label}
    </Button>
  ) : (
    <Button
      className={`custom-button ${type}`}
      radius="xl"
      size="xl"
      style={{
        '--scale-value': scaleValue,
      }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

export default CustomButton;
