import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Container, Title, MantineProvider } from '@mantine/core';
import './App.css';
import './common.css';
import CustomButton from './components/CustomButton';
import RngButton from './components/RngButton';
import IncrementButton from './components/IncrementButton';
import AnimatedList from './components/AnimatedList';
import Speaker from './components/Speaker';
import Game from './Game';

function App() {
  const [isFun, setIsFun] = useState(false);
  const [scaleValue, setScaleValue] = useState(1.1);
  const toggleFun = () => {
    setScaleValue(scaleValue === 1.1 ? 1.9 : 1.1);
    setIsFun(!isFun);
  };

  return (
    <MantineProvider className='root'>
      {isFun ? <Draggable>
        <Speaker />
      </Draggable> : undefined}
      <Title className='warning'>
        This website is under renovations. A stable release will be issued in October 2024.
      </Title>
      <Container className="app-container">
        <Title className="app-title" order={1}>
          Erik Maung's Portfolio
        </Title>
        <div className="button-group">
          <CustomButton label="Home" type={isFun ? "danger" : "secondary"} href={"https://erikmaung.github.io/"} scaleValue={scaleValue} />
          <CustomButton label="Portfolio" type={isFun ? "secondary" : "secondary"} scaleValue={1.1} />
          <CustomButton label={isFun ? "Fun: ON" : "Fun: OFF"} type={isFun ? "success" : "secondary"} scaleValue={scaleValue} onClick={toggleFun} />
        </div>
        <AnimatedList />
      </Container>
      <Container className={`experiment rotate`} />
      {isFun ?
        <Game scaleValue={scaleValue} />
        : undefined}
      <Container className="footer">
        &copy; Erik Maung 2024
      </Container>
    </MantineProvider>
  );
}

export default App;
