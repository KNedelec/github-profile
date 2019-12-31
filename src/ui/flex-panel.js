import React from 'react';
import styled from 'styled-components';

const StyledPanel = getStyledPanel();

export function FlexPanel(props) {
  return <StyledPanel { ...props } />
}

function getStyledPanel() {
  return styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: middle;
    flex-direction: ${props => props.direction || 'row'};
    margin -0.5rem -0.5rem;

    &>div {
      margin: 0.5rem;
      flex: 1;
    }
  `;
}
