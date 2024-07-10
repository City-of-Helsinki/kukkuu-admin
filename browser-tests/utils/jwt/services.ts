import BrowserTestJWTConfig from './config';

async function fetchMyAdminProfile(apiToken: string) {
  try {
    // eslint-disable-next-line no-console
    console.debug('fetchMyAdminProfile props', {
      apiToken,
      kukkuuApiGraphqlEndpoint: BrowserTestJWTConfig.kukkuuApiGraphqlEndpoint,
    });
    const response = await fetch(
      BrowserTestJWTConfig.kukkuuApiGraphqlEndpoint,
      {
        headers: new Headers({
          Authorization: `Bearer ${apiToken}`,
          'content-type': 'application/json',
        }),
        // eslint-disable-next-line max-len
        body: '{"operationName":"MyAdminProfile","variables":{},"query":"query MyAdminProfile {\\n  myAdminProfile {\\n    id\\n    projects {\\n      edges {\\n        node {\\n          id\\n          year\\n          name\\n          myPermissions {\\n            publish\\n            manageEventGroups\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}"}',
        method: 'POST',
      }
    );
    return await response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching admin profile:', error);
    throw error;
  }
}

/**
 * Resolve a browser test project id from the Kukkkuu API.
 * The admin users that are used in the browser test are linked to a
 * one specific project in the Kukkuu API, which is a project that is
 * used to map all the browser test events and children together.
 *
 * @description
 * The logged in admin user has an ad_group -field populated with a value
 * that is mapped via Kukkuu API's AD-group-mapping table to one specific
 * user group. That user group is for browser test usage and that should
 * give admin privileges to the users of the group
 * to the browser test project.
 *
 * @param apiToken the bearer token set in the authorization-header
 * @returns the browser test project id
 */
export async function fetchBrowserTestProjectIdFromAPI(
  apiToken: string
): Promise<string> {
  const {
    data: {
      myAdminProfile: { projects },
    },
  } = await fetchMyAdminProfile(apiToken);
  // The user should have only one project, so select the first.
  // NOTE: If there are multiple, we don't know which one to choose.
  const browserTestProject = projects.edges[0].node;
  // eslint-disable-next-line no-console
  console.debug('fetchBrowserTestProjectIdFromAPI response', {
    browserTestProject,
    projects: JSON.stringify(projects),
  });
  return browserTestProject.id;
}
