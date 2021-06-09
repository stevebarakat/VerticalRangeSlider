import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';

let focusColor = "";
let blurColor = "";
let newValue = "";
let selectedValue = "";

const VerticalRangeSlider = ({ min = 0, max = 100, decimals = 0, step = 0, height = "250px", prefix="", suffix="", primaryColor = "black", primaryColor50 }) => {
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
    const labelLength = i.toString().length;
    markers.push(<Tick key={i} decimals={decimals} labelLength={labelLength} prefix={prefix} suffix={suffix}><span style={{whiteSpace: "nowrap"}}>{prefix + i.toFixed(decimals) + " " + suffix}</span></Tick>);
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
    <RangeWrapWrap heightVal={height}>
      <RangeWrap heightVal={height}>
        <RangeOutput
          focused={isFocused}
          style={{ left: `calc(${newValue}% + (${newPosition / 10}rem))` }}
          className="range-value"
        >
          {prefix + value.toFixed(decimals) + " " + suffix}
        </RangeOutput>
        <StyledRangeSlider
          heightVal={height}
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
    </RangeWrapWrap>
  );
};

export default VerticalRangeSlider;

const whiteColor = "white";
const blackColor = "#999";

const RangeWrapWrap = styled.div`
  /* background: rebeccapurple; */
  width: 250px;
`
const RangeWrap = styled.div`
  position: relative;
  top: ${p => p.heightVal};
  margin: 0 3rem;
  transform: rotate(270deg);
  transform-origin: top left;
  /* background: pink; */
  width: ${p => p.heightVal};
  font-family: monospace;
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
  appearance: none;
  margin: 20px 0;
  width: 100%;
  height: 15px;
  border-radius: 15px;
  border: 1px solid #000;
  position: relative;
  z-index: 1;
  background: transparent;
  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    /* position: relative; */
    height: 2.2rem;
    width: 2.2rem;
    border-radius: 50%;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 1);
    cursor: pointer;
    -webkit-appearance: none;
    z-index: 50;
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
    z-index: 50;
    background-color: white;
    background: ${p => !p.focused && `-webkit-radial-gradient(center, ellipse cover,  ${focusColor} 0%,${focusColor} 35%,${whiteColor} 40%,${whiteColor} 100%)`};
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
  background: ${p => p.focused ? focusColor : blurColor};
  height: 15px;
  border-radius: 25px;
  position: absolute;
  top: 20px;
  cursor: pointer;
  /* transition: width 0.1s; */
`;

const Ticks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: ${newValue - 100 / 2 * -0.02 + "rem"};
  margin-left: ${newValue - 100 / 2 * -0.02 + "rem"};
  position: relative;
  top: -3rem;
  text-align: right;
`;

const Tick = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: flex-end;
  width: 1px;
  background: ${blackColor};
  height: 5px;
  margin-top: -0.5rem;
  span {
    writing-mode: vertical-rl;
    margin-left: 0.4rem;
    margin-bottom: 0.5rem;
    /* margin-bottom: ${p => p.labelLength + p.decimals + p.prefix.length + p.suffix.length + "ch"}; */
  }
`;