import React from 'react';
import styled from 'styled-components';

import { FormField } from './form-field';
import { Button } from './button';

const Container = getStyledContainer();
const FieldContainer = getStyledFieldContainer();
const ButtonContainer = getStyledButtonContainer();
const ErrorMessage = getStyledErrorMessage();

export function TokenForm(props) {

  const [token, setToken] = React.useState('');

  return (
    <Container>
      <FieldContainer>
        <FormField
          type="text"
          placeholder="Your private access token"
          onChange={e => setToken(e.currentTarget.value)}
          value={token}
        />
    { props.authStatus === 'INVALID_TOKEN' && (
      <ErrorMessage>This token seems to be invalid</ErrorMessage>
    )}
      </FieldContainer>
      <ButtonContainer>
        <Button onClick={e => props.changeAccessToken(token)}>OK</Button>
      </ButtonContainer>
    </Container>
  );
}

export function getStyledErrorMessage() {
  return styled.span`
    color: red;
  `;
}

export function getStyledFormField() {
  return styled(FormField)`
  `;
}

export function getStyledContainer() {
  return styled.div`
    display: flex;
  `;
}

export function getStyledButtonContainer() {
  return styled.div`
    flex: initial;
  `;
}

export function getStyledFieldContainer() {
  return styled.div`
    flex: 1;
    margin-right: 12px;
  `;
}
