import React from 'react';
import styled from 'styled-components';

import { Card, FlexPanel, Display } from './';

const StatCard = styled(Card)`
`;

export function StatItem(props) {
  return (
    <StatCard>
      <FlexPanel direction="column">
        <Display color={props.color} size="large">
          { props.statValue }
        </Display>
        <Display>
          { props.statName }
        </Display>
      </FlexPanel>
    </StatCard>
  );
}
