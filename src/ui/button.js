import React from 'react';
import styled from 'styled-components';

const StyledButton = getStyledButton();

export function Button(props) {
  return <StyledButton {...props} />
}

function getStyledButton() {
  return styled.button`
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    color: rgb(86, 86, 86);
    background-color: rgb(251, 201, 63);
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    transition: all 100ms ease 0s;
    font: inherit;
  `;
}
