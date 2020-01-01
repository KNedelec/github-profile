import React from 'react';
import styled from 'styled-components';

import { Card, Display, FlexPanel, Language } from './';

const RepoCard = styled(Card)`
  padding: 1rem;
  white-space: nowrap;
`;

export function RepoItem(props) {

  return (
    <RepoCard>
      <FlexPanel align="flex-start" direction="column">
        <Display lower size="small">
          { props.repoName }
        </Display>
        <Display lower>
          { props.repoStars } stars
        </Display>
        <Display lower>
          { props.languages && props.languages.map(l => (
            <Language lang={l} key={l.name} />
          ))}
        </Display>
      </FlexPanel>
    </RepoCard>
  );
}
