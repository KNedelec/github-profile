import React from 'react';
import styled from 'styled-components';

const StyledCard = getStyledCard();

export function Card(props) {
  return <StyledCard {...props} />
}

function getStyledCard() {
  return styled.div`
    box-shadow: rgba(0, 0, 0, 0.09) 0 0 1.5rem 0;
    border-radius: 0.5rem;
    border: solid 2px rgb(235, 235, 235);
    padding: 3.5rem;
  `;
}
