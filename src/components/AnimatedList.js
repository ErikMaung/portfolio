import React, { useState, useEffect } from 'react';
import './AnimatedList.css';
import '../common.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const email = 'E-Mail: erikmaung1@gmail.com';
const phone = 'Phone: (626)-624-1560';

function AnimatedList() {
  const [items, setItems] = useState(['SoundSage MERN Stack Project', 'Generative Text LSTM Movie Review Generator', 'UCLA Undergraduate Research Week Presentation 2023 - VR Prism Adaptation']);
  const [links, setLinks] = useState(['https://github.com/ethanbresk/soundsage', 'https://github.com/ErikMaung/review-generator', 'https://www.youtube.com/watch?v=Etus7gOQbMQ']);
  const [items2, setItems2] = useState(['LinkedIn', email, phone]);
  const [links2, setLinks2] = useState(['https://www.linkedin.com/in/erik-maung/', undefined, undefined]);
  const [animate, setAnimate] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleCopy = () => {
    setShowOverlay(true);
    setTimeout(() => {
        setShowOverlay(false);
    }, 2000); // 2 sec
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className={`overlay-message overlay-center overlay-top ${showOverlay ? '' : 'hide'}`}>
        Copied to Clipboard!
      </div>
      <div className={`list-container ${isVisible ? 'visible' : ''}`}>
        <div onClick={toggleVisibility} style={{ width: '80vw' }}>
          <h2>My Resume (click to {isVisible ? 'hide' : 'show'})</h2>
        </div>
        <div className="resume-container">
          <img
            className="resume"
            src={require('../images/resume.png')}
            alt="Resume"
          />
        </div>
      </div>
      <div className="flex">
        <div className="list-container">
          <h2>My Projects</h2>
          <ul className="animated-list">
            {items.map((item, index) => (
              <li key={index} className={`list-item ${animate ? 'animate' : ''}`}>
                <a href={links[index]} target="_blank" rel="noopener noreferrer">
                  <span>{item}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="list-container">
          <h2>Contact</h2>
          <ul className="animated-list">
            {items2.map((item, index) => (
              <CopyToClipboard text={item === email ? 'erikmaung1@gmail.com' : item === phone ? '6266241560' : undefined} onCopy={handleCopy}>
                <li key={index} className={`list-item ${animate ? 'animate' : ''} ${item === email ? undefined : undefined}`}>
                  <a href={links2[index]} target="_blank" rel="noopener noreferrer">
                    <span>{item}</span>
                    {item === email || item === phone ? <svg className='copy-svg' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="20" height="20" viewBox="0 0 512 640" fill='#00000080'>
                      <g><path d="M324.896,106.622H107.87c-18.14,0-32.887,14.747-32.887,32.887v320.034c0,18.14,14.747,32.909,32.887,32.909h217.026   c18.14,0,32.909-14.769,32.909-32.909V139.51C357.805,121.369,343.036,106.622,324.896,106.622z M339.621,459.544   c0,8.116-6.608,14.725-14.725,14.725H107.87c-8.116,0-14.725-6.608-14.725-14.725V139.51c0-8.116,6.608-14.725,14.725-14.725   h217.026c8.116,0,14.725,6.608,14.725,14.725V459.544z" /><path d="M406.371,19.548H198.415c-22.431,0-40.671,20.114-40.671,44.829v13.017c0,5.012,4.069,9.081,9.081,9.081   s9.081-4.069,9.081-9.081V64.377c0-14.703,10.101-26.667,22.509-26.667h207.956c6.875,0,12.463,6.863,12.463,15.301v315.832   c0,8.449-5.588,15.302-12.463,15.302h-23.64c-5.012,0-9.092,4.08-9.092,9.092c0,5.012,4.08,9.092,9.092,9.092h23.64   c16.898,0,30.647-15.035,30.647-33.486V53.012C437.018,34.561,423.269,19.548,406.371,19.548z" /></g>
                    </svg> : undefined}
                  </a>
                </li>
              </CopyToClipboard>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default AnimatedList;
