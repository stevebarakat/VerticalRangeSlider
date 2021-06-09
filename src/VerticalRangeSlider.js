import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';

let focusColor = "";
let blurColor = "";
let newValue = "";
let selectedValue = "";

const VerticalRangeSlider = ({ min = 0, max = 100, decimals = 0, step = 0, height = "250px", primaryColor = "black", primaryColor50 }) => {
  const rangeEl = useRef(null);
  const [value, setValue] = useState((min + max) / 2);
  const [isFocused, setIsFocused] = useState(false);
  const factor = (max - min) / 10;
  focusColor = primaryColor;
  blurColor = primaryColor50;
  newValue = Number(((value - min) * 100) / (max - min));
  const newPosition = 10 - newValue * 0.2;

  useEffect(() => {
    rangeEl.current.focus();
    if (value > max) {
      setValue(max);
    } else {
      setValue(rangeEl.current.valueAsNumber);
    }
  }, [value, max]);

  let markers = [];
  for (let i = min; i <= max; i += step) {
    console.log(i);
    markers.push(<Tick><span>{i}</span></Tick>);
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
    <RangeWrap style={{ width: height }}>
      <RangeOutput
        focused={isFocused}
        style={{ left: `calc(${newValue}% + (${newPosition / 10}rem))` }}
        className="range-value"
      >
        {value.toFixed(decimals)}
        {/* {value > max ? max : value.toFixed(decimals)} */}
      </RangeOutput>
      <StyledRangeSlider
        list="tickmamrks"
        ref={rangeEl}
        min={min}
        max={max}
        step={step}
        value={value > max ? max : value.toFixed(decimals)}
        onInput={(e) => {
          rangeEl.current.focus();
          setValue(e.target.valueAsNumber);
        }}
        onKeyDown={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        focused={isFocused}
      />
      <Ticks>
        {marks}
      </Ticks>
      <Progress
        onClick={e => console.log(e)}
        focused={isFocused}
        style={{ width: `calc(${newValue}% + (${newPosition / 10}rem))` }}
      />
    </RangeWrap>
  );
};

export default VerticalRangeSlider;

const whiteColor = "white";
const blackColor = "#999";

const RangeWrap = styled.div`
  position: relative;
  margin-top: 5rem;
  margin-left: -9rem;
  transform: rotate(270deg);
  transform-origin: 75%;
`;

const RangeOutput = styled.div`
  font-family: sans-serif;
  position: absolute;
  margin-top: 3.5rem;
  margin-left: -1.2rem;
  left: 50%;
  border: ${p => p.focused ? "none" : `1px solid ${blackColor}`};
  background: ${p => p.focused ? focusColor : whiteColor};
  color: ${p => p.focused ? whiteColor : blackColor};
  line-height: 1.75rem;
  text-align: center;
  padding: 0.15rem 0.5rem;
  font-size: 1rem;
  display: block;
  transform: translate(-50%, 0);
  border-radius: 5px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
  transform: rotate(90deg);
  transition: all 0.15s ease-out;
`;

const StyledRangeSlider = styled.input.attrs({ type: "range" })`
  appearance: none;
  margin: 20px 0;
  width: 100%;
  border-radius: 25px;
  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    width: 15px;
    height: 15px;
    cursor: pointer;
    background: transparent;
    border-radius: 25px;
    box-shadow: inset 0 0 3px 1px rgba(0, 0, 0, 0.5);
    z-index: 9999;
  }
  &::-moz-range-runnable-track {
    width: 15px;
    height: 15px;
    cursor: pointer;
    background: transparent;
    border-radius: 25px;
    box-shadow: inset 0 0 3px 1px rgba(0, 0, 0, 0.5);
    z-index: 9999;
  }
  &:focus::-webkit-slider-runnable-track{
    background: whiteColor;
  }
  &:focus::-moz-range-runnable-track{
    background: whiteColor;
  }

  &::-webkit-slider-thumb {
    position: relative;
    height: 2.2rem;
    width: 2.2rem;
    border-radius: 50%;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 1);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -10px;
    z-index: 999;
    background-color: white;
    background: ${p => !p.focused && `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)`};
  }
  &::-moz-range-thumb {
    position: relative;
    height: 2.2rem;
    width: 2.2rem;
    border-radius: 50%;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 1);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -10px;
    z-index: 999;
    background-color: white;
    background: -webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%);
  }
  &:focus::-webkit-slider-thumb {
    background: ${p => p.focused && `-webkit-radial-gradient(center, ellipse cover,  ${whiteColor} 0%,${whiteColor} 35%,${focusColor} 40%,${focusColor} 100%)`};
    transition: all 0.15s ease-out;
  }
  &:focus::-moz-range-thumb {
    background: ${p => p.focused && `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)`};
    transition: all 0.15s ease-out;
  }
`;

const Progress = styled.div`
  background: ${p => p.focused ? focusColor : blurColor};
  height: 15px;
  border-radius: 25px;
  position: absolute;
  top: 20px;
  z-index: 0;
  cursor: pointer;
  /* transition: width 0.1s; */
`;

const Ticks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: ${newValue - 100 / 2 * -0.02 + "rem"};
  margin-left: ${newValue - 100 / 2 * -0.02 + "rem"};;
  position: relative;
  top: -3rem;
`;

const Tick = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  width: 1px;
  background: ${blackColor};
  height: 5px;
  top: -2rem;

  span{
    transform: rotate(90deg);
  }
`;