import React from 'react';
import styled from 'styled-components';

import { Card, FlexPanel, Display, Loader } from './';

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

export function AsyncStatItem(props) {
  if (props.isLoading) {
    return <Card><Loader /></Card>
  }
  return <StatItem {...props } />;
}
