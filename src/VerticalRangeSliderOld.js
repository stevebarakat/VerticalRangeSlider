import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';

let fillColor = "";
let newValue = "";

const VerticalRangeSlider = ({ min = 0, max = 100, decimals = 0, step = 0, height = "250px", primaryColor = "black" }) => {
  const rangeEl = useRef(null);
  const [value, setValue] = useState((min + max) / 2);
  const [isFocused, setIsFocused] = useState(false);
  newValue = Number(((value - min) * 100) / (max - min));
  const newPosition = 10 - newValue * 0.2;
  fillColor = primaryColor;

  useEffect(() => {
    rangeEl.current.focus();
    setValue(rangeEl.current.value)
  }, [])

  return (
    <RangeWrap style={{ width: height}}>
      <RangeOutput
        focused={isFocused}
        style={{ left: `calc(${newValue}% + (${newPosition / 10}rem))` }}
        className="range-value"
      >
        {parseFloat(value).toFixed(decimals)}
      </RangeOutput>
      <StyledRangeSlider
        min={min}
        max={max}
        step={step}
        value={value}
        onInput={(e) => {
          rangeEl.current.focus();
          setValue(e.target.value);
        }}
        ref={rangeEl}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Progress
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
  margin-left: -15rem;
  transform: rotate(270deg);
  transform-origin: 75%;
`;

const RangeOutput = styled.div`
  font-family: sans-serif;
  position: absolute;
  margin-top: 3.5rem;
  margin-left: -2.5%;
  left: 50%;
  border: ${p => p.focused ? "none" : `1px solid ${blackColor}`};
  background: ${p => p.focused ? fillColor : whiteColor};
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
  &:focus {
    outline: none;
  }
  &::-webkit-slider-thumb {
    position: relative;
    height: 2.2rem;
    width: 2.2rem;
    border-radius: 50%;
    background: ${whiteColor};
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 1);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -10px;
    z-index: 999;
  }
  &::-moz-range-thumb {
    position: relative;
    height: 2.2rem;
    width: 2.2rem;
    border-radius: 50%;
    background: ${whiteColor};
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 1);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -10px;
    z-index: 999;
  }
  &::-webkit-slider-runnable-track {
    width: 15px;
    height: 15px;
    cursor: pointer;
    background: white;
    border-radius: 25px;
    box-shadow: inset 0 0 3px 1px rgba(0, 0, 0, 0.5);
  }
  &::-moz-range-runnable-track {
    width: 15px;
    height: 15px;
    cursor: pointer;
    background: white;
    border-radius: 25px;
    box-shadow: inset 0 0 3px 1px rgba(0, 0, 0, 0.5);
  }
  &:focus::-webkit-slider-runnable-track{
    background: whiteColor;
  }
  &:focus::-moz-range-runnable-track{
    background: whiteColor;
  }

  &:focus::-webkit-slider-thumb {
    background: ${p => p.focused ? whiteColor : `-webkit-radial-gradient(center, ellipse cover,  ${fillColor} 0%,${fillColor} 35%,${whiteColor} 40%,${whiteColor} 100%)`};
    transition: all 0.15s ease-out;
  }
  &:focus::-moz-range-thumb {
    background: ${p => p.focused ? whiteColor : `-webkit-radial-gradient(center, ellipse cover,  ${fillColor} 0%,${fillColor} 35%,${whiteColor} 40%,${whiteColor} 100%)`};
    transition: all 0.15s ease-out;
  }
`;

const Progress = styled.div`
  background: ${p => p.focused ? fillColor : "#EFEFEF"};
  height: 15px;
  width: 15px;
  border-radius: 25px;
  position: absolute;
  top: 20px;
  box-shadow: inset 0 0 3px 1px rgba(0, 0, 0, 0.5);
  z-index: 0;
  transition: all 0.15s ease-out;
`;