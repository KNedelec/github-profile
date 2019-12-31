import React from 'react';
import styled from 'styled-components';

const Input = getStyledTextField();

export function TextField(props) {
  return <Input type="text" {...props} />
}

function getStyledTextField() {
  return styled.input`
    width: 100%;
    box-sizing: border-box;
    color: rgb(48, 53, 58);
    background-color: rgb(255, 255, 255);
    padding: calc(0.5rem - 1px) 0.5rem;
    border: solid 2px rgb(235, 235, 235);
    border-radius: 0.5rem;
    font: inherit;
  `;
}
