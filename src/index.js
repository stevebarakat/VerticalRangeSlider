import React from 'react';
import ReactDOM from 'react-dom';
import VerticalRangeSlider from './VerticalRangeSlider';
import './global.css';

ReactDOM.render(
  <React.StrictMode>
    <div style={{display: 'flex', gap: "3rem"}}>
      <VerticalRangeSlider
        min={-200}
        max={5100}
        step={10}
        decimals={0}
        height="400"
        primaryColor="hsl(196, 100%, 48%)"
        primaryColor50="hsla(196, 100%, 48%, 0.5)"
      />
      {/* <VerticalRangeSlider
        min={-500}
        max={500}
        step={50}
        decimals={0}
        height="800"
        primaryColor="hsl(196, 100%, 48%)"
        primaryColor50="hsla(196, 100%, 48%, 0.5)"
      />
      <VerticalRangeSlider
        min={100}
        max={10100}
        step={500}
        decimals={2}
        height="800"
        prefix="$"
        primaryColor="hsl(196, 100%, 48%)"
        primaryColor50="hsla(196, 100%, 48%, 0.5)"
      />
      <VerticalRangeSlider
        min={0}
        max={10000}
        step={1000}
        decimals={0}
        height="800"
        suffix="Gallons"
        primaryColor="hsl(196, 100%, 48%)"
        primaryColor50="hsla(196, 100%, 48%, 0.5)"
      /> */}
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
