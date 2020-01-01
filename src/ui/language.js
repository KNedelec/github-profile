import React from 'react';
import styled from 'styled-components';

import * as colors from './colors';

const Color = styled.span`
  display: inline-block;
  background-color: ${props => props.color};
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;
const Lang = styled.span`
  color: ${colors.TEXT_DISABLED};
`;

export function Language(props) {
  return (
    <>
      <Color color={props.lang.color}>
      </Color>
      <Lang>
        { props.lang.name }
      </Lang>
    </>
  );
}
