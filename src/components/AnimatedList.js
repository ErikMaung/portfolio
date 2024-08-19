import React, { useState, useEffect } from 'react';
import './AnimatedList.css';

function AnimatedList() {
  const [items, setItems] = useState(['SoundSage MERN Stack Project', 'Generative Text LSTM Movie Review Generator', 'LinkedIn']);
  const [links, setLinks] = useState(['https://github.com/ethanbresk/soundsage', 'https://github.com/ErikMaung/review-generator', 'https://www.linkedin.com/in/erik-maung/']);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger the animation after the component is mounted
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="list-container">
      <img src={require('../images/resume.png')} />
      <ul className="animated-list">
        {items.map((item, index) => (
          <li key={index} className={`list-item ${animate ? 'animate' : ''}`}>
            <a href={links[index]}
              target="_blank" // Opens the link in a new tab
              rel="noopener noreferrer" // Security measure to prevent tabnabbing
            >{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnimatedList;
