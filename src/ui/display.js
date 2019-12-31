import React from 'react';
import styled from 'styled-components';

const StyledDisplay = styled.div`
  font-size: ${props => {
    switch(props.size) {
      case 'large': return '5.5rem';
      case 'medium': return '2.5rem';
      case 'small': default:  return '1rem';
    }
  }};
  color: ${props => props.color || 'inherit'};
  text-transform: uppercase;
`;

export const Display = props => <StyledDisplay {...props} />
