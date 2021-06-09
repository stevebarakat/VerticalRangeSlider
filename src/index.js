import React from 'react';
import ReactDOM from 'react-dom';
import VerticalRangeSlider from './VerticalRangeSlider';
import './global.css';

ReactDOM.render(
  <React.StrictMode>
    <VerticalRangeSlider 
      min={0}
      max={10000}
      step={1000}
      decimals={0}
      height="1100px"
      primaryColor="hsl(196, 100%, 48%)"
      primaryColor50="hsla(196, 100%, 48%, 0.5)"
    />
  </React.StrictMode>,
  document.getElementById('root')
);
