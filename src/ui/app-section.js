import React from 'react';
import styled from 'styled-components';

import { Title } from './title';

const Section = getStyledSection();

export function AppSection(props) {
  return (
    <Section>
      { props.title && <Title>{props.title}</Title> }
      { props.children }
    </Section>
  );
}

function getStyledSection() {
  return styled.section`
    padding: 1rem;
  `;
}
