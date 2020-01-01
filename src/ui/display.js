import React from 'react';
import styled from 'styled-components';

const StyledDisplay = styled.div`
  font-size: ${props => {
    switch(props.size) {
      case 'large': return '5.5rem';
      case 'medium': return '2.5rem';
      case 'small': return '1.75rem';
      case 'vsmall': default:  return '1rem';
    }
  }};
  color: ${props => props.color || 'inherit'};
  text-transform: ${props => !props.lower ? 'uppercase' : 'inherit'};
`;

export const Display = props => <StyledDisplay {...props} />
