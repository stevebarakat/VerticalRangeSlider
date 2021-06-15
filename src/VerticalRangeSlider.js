import React, { useState, useLayoutEffect, useRef } from "react";
import styled from 'styled-components';

let focusColor = "";
let blurColor = "";
let newValue = "";
let newPosition = "";
let selectedValue = "";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const VerticalRangeSlider = ({ min = 0, max = 100, decimals = 0, step = 0, height = "250px", prefix = "", suffix = "", primaryColor = "black", primaryColor50 }) => {
  const rangeEl = useRef(null);
  const outputEl = useRef(null);
  const [value, setValue] = useState((min + max) / 2);
  const [isFocused, setIsFocused] = useState(false);
  const [outputWidth, setOutputWidth] = useState('');
  const [tickWidth, setTickWidth] = useState('');
  const factor = (max - min) / 10;
  focusColor = primaryColor;
  blurColor = primaryColor50;
  newValue = Number((value - min) * 100) / (max - min);
  newPosition = Number(10 - newValue * 0.2);

  useLayoutEffect(() => {
    console.log(outputEl.current.parentNode.lastChild.lastChild.firstChild);
    console.log(outputEl.current.parentNode.lastChild.lastChild.firstChild.clientHeight);
    setTickWidth(outputEl.current.parentNode.lastChild.lastChild.firstChild.clientHeight);
    setOutputWidth(outputEl.current.clientHeight);
    rangeEl.current.focus();
    if (value > max) {
      setValue(max);
    } else {
      setValue(rangeEl.current.valueAsNumber);
    }
  }, [value, max]);

  let markers = [];
  for (let i = min; i <= max; i += step) {
    markers.push(<Tick key={i}><div>{prefix + numberWithCommas(i.toFixed(decimals)) + " " + suffix}</div></Tick>);
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
    <RangeWrapWrap outputWidth={outputWidth} tickWidth={tickWidth} heightVal={height}>
      <RangeWrap tickWidth={tickWidth} heightVal={height}>
        <RangeOutput
          ref={outputEl}
          focused={isFocused}
          style={{ left: `calc(${newValue}% + (${newPosition / 10}rem))` }}
          className="disable-select"
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
          className="disable-select"
        />
        <Progress focused={isFocused} />
        <Ticks>
          {marks}
        </Ticks>
      </RangeWrap>
    </RangeWrapWrap>
  );
};

export default VerticalRangeSlider;


const whiteColor = 'white';
const blackColor = "#999";

const RangeWrapWrap = styled.div`
  width: ${p => p.outputWidth + p.tickWidth + 100 + "px"};
  height: ${p => p.heightVal + 30};
  background: lavender;
  border: 1px solid ${blackColor};
  box-shadow: 1px 1px 2px hsla(0, 0%, 0%, 0.25),
    0px 0px 2px hsla(0, 0%, 0%, 0.25);
  border-radius: 8px;
  padding: 30px;
`;
const RangeWrap = styled.div`
  width: ${p => p.heightVal};
  margin-left: ${p => (p.tickWidth) + "px"};
  transform: rotate(270deg);
  transform-origin: top left;
  margin-top: ${p => p.heightVal};
  left: 0;
  top: 0;
  font-family: sans-serif;
`;

const RangeOutput = styled.div`
  cursor: default;
  position: absolute;
  margin-top: 3.5rem;
  margin-left: -0.8rem;
  border: ${p => p.focused ? `1px solid ${focusColor}` : `1px solid ${blackColor}`};
  background: ${p => p.focused ? focusColor : whiteColor};
  color: ${p => p.focused ? whiteColor : blackColor};
  text-align: left;
  padding: 0.25rem 0.25rem;
  font-size: 1rem;
  display: block;
  border-radius: 5px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
  writing-mode: vertical-lr;
  transition: all 0.15s ease-out;
  white-space: nowrap;
`;

const StyledRangeSlider = styled.input.attrs({ type: "range" })`
  cursor: pointer;
  appearance: none;
  position: absolute;
  width: 100%;
  height: 15px;
  border-radius: 15px;
  background: transparent;
  margin: 20px 0 0 0;
  border: 1px solid ${blackColor};
  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    cursor: grab;
    pointer-events: all;
    position: relative;
    height: 2.15rem;
    width: 2.15rem;
    border-radius: 50%;
    -webkit-appearance: none;
    z-index: 50;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 1);
    background: ${p => !p.focused && `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)`};
  }
  &::-moz-range-thumb {
    cursor: grab;
    pointer-events: all;
    position: relative;
    height: 2.15rem;
    width: 2.15rem;
    border-radius: 50%;
    -webkit-appearance: none;
    z-index: 50;
    background: ${p => !p.focused && `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)`};
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 1);
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
  position: absolute;
  display: block;
  width: 100%;
  height: 15px;
  border-radius: 15px;
  top: 20px;
  box-shadow: inset 1px 1px 2px hsla(0, 0%, 0%, 0.25),
    inset 0px 0px 2px hsla(0, 0%, 0%, 0.25);
  transition: all 0.15s ease-out;
  background: ${p => p.focused ? `-webkit-linear-gradient(left, ${focusColor} 0%,${focusColor} calc(${newValue}% + (${newPosition / 10}rem)),${whiteColor} calc(${newValue}% + (${newPosition / 10}rem)),${whiteColor} 100%)` :
    `-webkit-linear-gradient(left, ${blurColor} 0%,${blurColor} calc(${newValue}% + (${newPosition / 10}rem)),${whiteColor} calc(${newValue}% + (${newPosition / 10}rem)),${whiteColor} 100%)`};
`;

const Ticks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 1rem;
  margin-left: 1rem;
`;

const Tick = styled.div`
  cursor: text;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: flex-end;
  width: 1px;
  background: ${blackColor};
  height: 5px;
  div {
    white-space: nowrap;
    writing-mode: vertical-rl;
    margin-left: 0.4rem;
    margin-bottom: 0.5rem;
  }
`;