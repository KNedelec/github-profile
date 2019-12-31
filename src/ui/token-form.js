import React from 'react';
import styled from 'styled-components';

import { FormField } from './form-field';
import { Button } from './button';

const Container = getStyledContainer();
const FieldContainer = getStyledFieldContainer();
const ButtonContainer = getStyledButtonContainer();

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
      </FieldContainer>
      <ButtonContainer>
        <Button onClick={e => props.changeAccessToken(token)}>OK</Button>
      </ButtonContainer>
    </Container>
  );
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
