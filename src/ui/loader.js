import React from 'react';
import styled from 'styled-components';

import { PRIMARY_COLOR } from './colors';

const StyledLoader = styled.div`
  height: 0;
  width: 0;
  padding: 15px;
  border: 6px solid #ccc;
  border-right-color: ${PRIMARY_COLOR};
  border-radius: 22px;
  -webkit-animation: rotate 1s infinite linear;
  position: relative;
  margin: auto;

  @keyframes rotate {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
`;

export function Loader(props) {
  return <StyledLoader />;
}
