import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { selectAuthToken, selectAuthStatus } from './auth/selectors';
import * as profileSelectors from './profile/selectors';
import * as repositorySelectors from './repository/selectors';
import * as colors from './ui/colors';
import { AppSection, ErrorMessage, FlexPanel, Loader, ProfilePage, AsyncStatItem,
  TokenForm, RepoItem } from './ui';

const AppContainer = getStyledAppContainer();

function App(props) {
  return (
    <AppContainer>
      <AppSection title="Github access token">
        <TokenForm
          token={props.token} 
          authStatus={props.authStatus}
          changeAccessToken={props.changeAccessToken} />
      </AppSection>

      { profileSection(props) }
      { statSection(props) }
      { repoSection(props) }

    </AppContainer>
  );
}

function statSection(props) {
  if (!props.profile.id) {
    return;
  }

  return (
    <AppSection title="Stats">
      <FlexPanel>
        <AsyncStatItem 
          statName="commits"
          statValue={props.totalCommits}
          color={colors.TERTIARY_COLOR}
          isLoading={props.isLoadingRepositories} />
        <AsyncStatItem 
          statName="Repositories"
          statValue={props.totalRepositories}
          color={colors.SECONDARY_COLOR}
          isLoading={props.isLoadingProfile} />
        <AsyncStatItem 
          statName="Stargazers"
          statValue={props.totalStars}
          color={colors.PRIMARY_COLOR}
          isLoading={props.isLoadingRepositories} />
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
  if (props.fetchRepositoriesError) {
    return (
      <ErrorMessage>
        An error occured while fetching the repositories
      </ErrorMessage>
    );
  }
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
    authStatus: selectAuthStatus(state),
    token: selectAuthToken(state),
    isLoadingProfile: isLoading,
    profile,
    fetchRepositoriesError:
      repositorySelectors.selectRepositoryFetchError(state),
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
