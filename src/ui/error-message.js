import styled from 'styled-components';

export const ErrorMessage = getStyledErrorMessage();

export function getStyledErrorMessage() {
  return styled.span`
    color: red;
  `;
}
