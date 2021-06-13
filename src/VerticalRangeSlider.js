import React, { useState, useLayoutEffect, useRef } from "react";
import styled from 'styled-components';

let focusColor = "";
let blurColor = "";
let newValue = "";
let newPosition = "";
let selectedValue = "";

const VerticalRangeSlider = ({ min = 0, max = 100, decimals = 0, step = 0, height = "250px", prefix = "", suffix = "", primaryColor = "black", primaryColor50 }) => {
  const rangeEl = useRef(null);
  const outputEl = useRef(null);
  const [value, setValue] = useState((min + max) / 2);
  const [isFocused, setIsFocused] = useState(false);
  const [outputWidth, setOutputWidth] = useState('');
  const factor = (max - min) / 10;
  focusColor = primaryColor;
  blurColor = primaryColor50;
  newValue = ((value - min) * 100) / (max - min);
  newPosition = 10 - newValue * 0.2;

  useLayoutEffect(() => {
    setOutputWidth(outputEl.current.clientHeight);
    rangeEl.current.focus();
    if (value > max) {
      setValue(max);
    } else {
      setValue(rangeEl.current.valueAsNumber);
    }
  }, [value, max]);


  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  let markers = [];
  for (let i = min; i <= max; i += step) {
    markers.push(<Tick key={i}><span style={{ whiteSpace: "nowrap", display: "inline-block" }}>{prefix + numberWithCommas(i.toFixed(decimals)) + " " + suffix}</span></Tick>);
  }
  const marks = markers.map(marker => marker);
  function handleKeyPress(e) {
    rangeEl.current.focus();

    // Check if modifier key is pressed
    const cmd = e.metaKey;
    const ctrl = e.ctrlKey;

    switch (e.keyCode) {
      case 13: //Enter
      case 32: //Space
        selectedValue = value;
        console.log(selectedValue);
        return;
      case 27: //Esc
        rangeEl.current.blur();
        return;
      case 37: //Left
        (cmd || ctrl) && setValue(value - factor);
        return;
      case 40: //Down
        (cmd || ctrl) && setValue(value - factor);
        return;
      case 38: //Up
        (cmd || ctrl) && setValue(value >= max ? max : value + factor);
        return;
      case 39: //Right
        (cmd || ctrl) && setValue(value >= max ? max : value + factor);
        return;
      default:
        return;
    }
  }

  return (
    <RangeWrapWrap outputWidth={outputWidth} heightVal={height}>
      <RangeWrap outputWidth={outputWidth} heightVal={height}>
        <RangeOutput
          ref={outputEl}
          focused={isFocused}
          style={{ left: `calc(${newValue}% + (${newPosition / 10}rem))` }}
          className="range-value"
        >
          {prefix + numberWithCommas(value.toFixed(decimals)) + " " + suffix}
        </RangeOutput>
        <StyledRangeSlider
          heightVal={height}
          list="tickmamrks"
          ref={rangeEl}
          min={min}
          max={max}
          step={step}
          value={value > max ? max : value.toFixed(decimals)}
          onClick={() => rangeEl.current.focus()}
          onInput={(e) => { setValue(e.target.valueAsNumber); }}
          onKeyDown={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          focused={isFocused}
        />
        <Ticks>
          {marks}
        </Ticks>
        <Progress
          style={isFocused ?
            { background: `-webkit-linear-gradient(left, ${focusColor} 0%,${focusColor} calc(${newValue}% + (${newPosition / 10}rem)),${whiteColor} calc(${newValue}% + (${newPosition / 10}rem)),${whiteColor} 100%)` } :
            { background: `-webkit-linear-gradient(left, ${blurColor} 0%,${blurColor} calc(${newValue}% + (${newPosition / 10}rem)),${whiteColor} calc(${newValue}% + (${newPosition / 10}rem)),${whiteColor} 100%)` }
          }
        />
      </RangeWrap>
    </RangeWrapWrap>
  );
};

export default VerticalRangeSlider;


const whiteColor = 'white';
const blackColor = "#999";
const RangeWrapWrap = styled.div`
  width: ${p => p.outputWidth * 2 + 40 + "px"};
  height: ${p => p.heightVal};
  /* background: pink; */
  border: 1px dashed red;
`;
const RangeWrap = styled.div`
  width: ${p => p.heightVal};
  margin-left: ${p => p.outputWidth - 20 + "px"};
  transform: rotate(270deg);
  transform-origin: top left;
  margin-top: ${p => p.heightVal};
  left: 0;
  top: 0;
  font-family: sans-serif;
`;

const RangeOutput = styled.div`
  position: absolute;
  margin-top: 3.5rem;
  margin-left: -0.8rem;
  border: ${p => p.focused ? "none" : `1px solid ${blackColor}`};
  background: ${p => p.focused ? focusColor : whiteColor};
  color: ${p => p.focused ? whiteColor : blackColor};
  text-align: left;
  padding: 0.75rem 0.25rem;
  font-size: 1rem;
  display: block;
  border-radius: 5px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
  writing-mode: vertical-lr;
  transition: all 0.15s ease-out;
  white-space: nowrap;
`;

const StyledRangeSlider = styled.input.attrs({ type: "range" })`
  margin-right: 8rem;
  appearance: none;
  position: absolute;
  margin-top: 20px;
  width: 100%;
  height: 15px;
  border-radius: 15px;
  border: 1px solid ${blackColor};
  background: transparent;
  z-index: 1;
  &:focus {
    outline: none;
  }
  &::-webkit-slider-thumb {
    height: 2.2rem;
    width: 2.2rem;
    border-radius: 50%;
    cursor: pointer;
    -webkit-appearance: none;
    z-index: 50;
    background-color: white;
    background: ${p => !p.focused && `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)`};
    pointer-events: all;
    box-shadow: 0 1px 4px 0.5px rgba(0, 0, 0, 0.25);
  }
  &::-moz-range-thumb {
    height: 2.2rem;
    width: 2.2rem;
    border-radius: 50%;
    cursor: pointer;
    -webkit-appearance: none;
    z-index: 50;
    background-color: white;
    background: ${p => !p.focused && `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)`};
    pointer-events: all;
    box-shadow: 0 1px 4px 0.5px rgba(0, 0, 0, 0.25);
  }
  &:focus::-webkit-slider-thumb {
    background: ${p => p.focused && `-webkit-radial-gradient(center, ellipse cover,  ${whiteColor} 0%,${whiteColor} 35%,${focusColor} 40%,${focusColor} 100%)`};
    transition: all 0.15s ease-out;
  }
  &:focus::-moz-range-thumb {
    background: ${p => p.focused && `-webkit-radial-gradient(center, ellipse cover,  ${whiteColor} 0%,${whiteColor} 35%,${focusColor} 40%,${focusColor} 100%)`};
    transition: all 0.15s ease-out;
  }
`;

const Progress = styled.div`
  z-index: -1;
  display: block;
  width: 100%;
  height: 15px;
  border: solid 1px #000;
  border-radius: 15px;
  position: absolute;
  top: 20px;
  cursor: pointer;
  box-shadow: inset 1px 1px 2px hsla(0, 0%, 0%, 0.25),
    inset 0px 0px 2px hsla(0, 0%, 0%, 0.25);
  transition: all 0.15s ease-out;
`;

const Ticks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: ${newValue - 100 / 2 * -0.02 + "rem"};
  margin-left: ${newValue - 100 / 2 * -0.02 + "rem"};
`;

const Tick = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: flex-end;
  width: 1px;
  background: ${blackColor};
  height: 5px;
  span {
    writing-mode: vertical-rl;
    margin-left: 0.4rem;
    margin-bottom: 0.5rem;
  }
`;