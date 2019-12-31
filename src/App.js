import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as profileSelectors from './profile/selectors';
import * as repositorySelectors from './repository/selectors';
import * as colors from './ui/colors';
import { AppSection, Card, Display, FlexPanel, FormField, ProfilePage, StatItem,
  TokenForm } from './ui';

const AppContainer = getStyledAppContainer();

function App(props) {

  return (
    <AppContainer>
      <AppSection title="Github access token">
        <TokenForm
          token={props.token} 
          changeAccessToken={props.changeAccessToken} />
      </AppSection>

      { props.isFresh &&
        <AppSection title="Profile">
          <ProfilePage { ...props.profile } />
        </AppSection>
      }
      { props.fullyLoaded && (
        <>
        <AppSection>
          <FlexPanel>
            <StatItem
              color={colors.TERTIARY_COLOR}
              statName="Commits"
              statValue={props.totalCommits} />
            <StatItem
              color={colors.SECONDARY_COLOR}
              statName="Repositories"
              statValue={props.totalRepositories} />
            <StatItem
              color={colors.PRIMARY_COLOR}
              statName="Stargazers"
              statValue={props.totalStars} />
          </FlexPanel>
        </AppSection>
        <AppSection title="Top Repositories">
          <FlexPanel>
              {props.top3Repositories && props.top3Repositories.map(r => {
                return (
                  <Card key={r.id}>
                    <Display size="medium">
                      {r.name}
                    </Display>
                    {r.totalStars} stars
                  </Card>
                );
              })}
          </FlexPanel>
        </AppSection>
        </>
      )}
    </AppContainer>
  );
}

function mapStateToProps(state) {
  const { isFresh, ...profile } = profileSelectors.selectProfileState(state);

  return {
    isFresh,
    profile,
    totalRepositories:
      repositorySelectors.selectRepositoryTotalCount(state),
    totalCommits: repositorySelectors.selectRepositoryTotalCommits(state),
    totalStars: repositorySelectors.selectRepositoryTotalStars(state),
    fullyLoaded: repositorySelectors.selectRepositoryIsFullyLoaded(state),
    top3Repositories: repositorySelectors.selectRepositoryTop3(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeAccessToken: token => dispatch({ type: 'TOKEN_CHANGED', token }),
  };
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default connectedApp;

export function getStyledAppContainer() { 
 return styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    @media (min-width: 1600px) {
      max-width: 1200px;
    }
  `;
}
