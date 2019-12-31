import React from 'react';
import styled from 'styled-components';

const T = styled.div`
  color: rgb(21,122,204);
  font-size: 2.5rem;
  text-transform: uppercase;
  margin: 1rem 0;
`;

export function Title(props) {
  return <T {...props} />
}
