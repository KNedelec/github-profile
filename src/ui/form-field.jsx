import React from 'react';
import styled from 'styled-components';

import { TextField } from './text-field';

const StyledField = getStyledField();

export function FormField(props) {

  const Field = getInputField(props);

  return (
    <StyledField>
      <div>{ props.label }</div>
      <Field {...props} />
    </StyledField>
  );
}

const fields = {
  text: (props) => <TextField {...props} />,
};

function getInputField(props) {
  return fields[props.type];
}

function getStyledField() {
  return styled.div`
    display: flex;
    flex-direction: column;
  `;
}
