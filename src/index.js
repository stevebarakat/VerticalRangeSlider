import React from 'react';
import ReactDOM from 'react-dom';
import VerticalRangeSlider from './VerticalRangeSlider';
import './global.css';

ReactDOM.render(
  <React.StrictMode>
    <VerticalRangeSlider min={-5} max={100} decimals={0} step={0} height="400px" primaryColor="hsl(196, 100%, 48%)" />
  </React.StrictMode>,
  document.getElementById('root')
);
