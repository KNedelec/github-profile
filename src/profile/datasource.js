import { queryGraph } from '../utils/http';

export async function fetchProfile(token) {

  const { data, error } = await queryGraph(token, getProfileQuery());

  return {
    error,
    profile: data.viewer,
  }
}

export async function fetchRepositoryList(token, userId, count, after) {

  const { data, error } = await queryGraph(token, getRepositoryListQuery(
    userId,
    count,
    after
  ));

  return {
    error,
    repositories: data.viewer.repositories.edges,
  }
}

const getRepositoryListQuery = (userId, count, after) => {
  const afterQ = after ? `after: "${after}",` : '';

  return `
  {
    viewer {
      repositories(first: ${count}, ${afterQ} orderBy: {
        field: STARGAZERS,
        direction: DESC
      }) {
        edges {
          cursor
          node {
            ... on Repository {
              id
              name
              stargazers {
                totalCount
              }
              ref(qualifiedName: "master") {
                target {
                  ... on Commit {
                    history(author: {id: "${userId}"}) {
                      totalCount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`
};

const getProfileQuery = () => `
{
  viewer {
    id
    avatarUrl
    bio
    login
    name
    repositories {
      totalCount
    }
  }
}
`;
