import React from 'react';
import ReactDOM from 'react-dom';
import VerticalRangeSlider from './VerticalRangeSlider';
import './global.css';

ReactDOM.render(
  <React.StrictMode>
    <VerticalRangeSlider min={35452}
      max={106780}
      decimals={0}
      step={5000}
      height="500px"
      primaryColor="hsl(196, 100%, 48%)"
      primaryColor50="hsla(196, 100%, 48%, 0.5)"
    />
  </React.StrictMode>,
  document.getElementById('root')
);
