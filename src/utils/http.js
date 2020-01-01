
/*
 * Post a query on the github graphql api
 * @param {string} token - Auth token
 * @param {string} query - the graphql query, posted to the github remote endpoint
 * @returns { error, data } - the response data or the error code
 */
export async function queryGraph(token, query) {

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        'Authorization': `bearer ${token}`,
      },
      body: JSON.stringify({ query })
    });

    if (response.ok) {
      const result = await response.json();

      return { data: result.data };
    }

    return getError(response);
  } catch (e) {
    return { error: 'NETWORK_ERROR' };
  }
}

/**
 * Get an error code from an http response
 */
function getError(response) {
  if (/^5\d{2}$/.test(response.status.toString())) {
    return { error: 'SERVER_ERROR' };
  }

  switch (response.status) {
    case 403:
    case 401:
      return { error: 'INVALID_TOKEN' };
    default:
      return { error: 'UNKNOWN_ERROR' };
  }
}
