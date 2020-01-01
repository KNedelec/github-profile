import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as profileSelectors from './profile/selectors';
import * as repositorySelectors from './repository/selectors';
import * as colors from './ui/colors';
import { AppSection, Card, Display, FlexPanel, FormField, Loader, ProfilePage,
  StatItem, TokenForm, RepoItem } from './ui';

const AppContainer = getStyledAppContainer();

function App(props) {
  return (
    <AppContainer>
      <AppSection title="Github access token">
        <TokenForm
          token={props.token} 
          changeAccessToken={props.changeAccessToken} />
      </AppSection>

      { profileSection(props) }
      { statSection(props) }
      { repoSection(props) }

    </AppContainer>
  );
}

function commitStatItem(props) {
  if (props.isLoadingRepositories) {
    return <Card><Loader /></Card>
  }

  return (
    <StatItem
      color={colors.TERTIARY_COLOR}
      statName="Commits"
      statValue={props.totalCommits} />
  );
}

function repoStatItem(props) {
  if (props.isLoadingProfile) {
    return <Card><Loader /></Card>
  }

  return (
    <StatItem
      color={colors.SECONDARY_COLOR}
      statName="Repositories"
      statValue={props.totalRepositories} />
  );
}

function starsStatItem(props) {
  if (props.isLoadingRepositories) {
    return <Card><Loader /></Card>
  }

  return (
    <StatItem
      color={colors.PRIMARY_COLOR}
      statName="Stargazers"
      statValue={props.totalStars} />
  );
}

function statSection(props) {
  if (!props.profile.id) {
    return;
  }

  return (
    <AppSection title="Stats">
      <FlexPanel>
        { commitStatItem(props) }
        { repoStatItem(props) }
        { starsStatItem(props) }
      </FlexPanel>
    </AppSection>
  );
}

function profileSection(props) {
  if (props.isLoadingProfile) {
    return <Loader />;
  }

  if (!props.profile.id) {
    return;
  }

  return (
    <AppSection title="Profile">
      <ProfilePage { ...props.profile } />
    </AppSection>
  );
}

function repoSection(props) {
  if (!props.repoFullyLoaded && !props.isLoadingRepositories) {
    return;
  }
  return (
    <AppSection title="Top Repositories">
      { props.isLoadingRepositories && <Loader /> }
      <FlexPanel>
      {props.top3Repositories && props.top3Repositories.map(r => (
        <RepoItem key={r.id} repoName={r.name} repoStars={r.totalStars}
        languages={r.languages && r.languages.slice(0, 1)} />
      ))}
      </FlexPanel>
    </AppSection>
  );
}

function mapStateToProps(state) {
  const { isLoading, ...profile } =
    profileSelectors.selectProfileState(state);

  return {
    isLoadingProfile: isLoading,
    profile,
    totalRepositories:
      repositorySelectors.selectRepositoryTotalCount(state),
    isLoadingRepositories: repositorySelectors.selectRepositoryIsLoading(state),
    totalCommits: repositorySelectors.selectRepositoryTotalCommits(state),
    totalStars: repositorySelectors.selectRepositoryTotalStars(state),
    repoFullyLoaded: repositorySelectors.selectRepositoryIsFullyLoaded(state),
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
