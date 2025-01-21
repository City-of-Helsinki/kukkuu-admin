import { ClientFunction } from 'testcafe';

import { generateApiTokens, generateOIDCUserData } from '../oidc';
import { browserTestAdminUser } from '../users';
import OIDCLoginProviderStorage from '../storage';
import type {
  OIDCUserDataType,
  OIDCUserProfileType,
  PermissionsStoragePermission,
} from '../types';
import { fetchBrowserTestProjectIdFromAPI } from '../services';

// NOTE: The variables used by the ClientFunctions needs to be created in this file
// or otherwise more dependencies are needed by the ClientFunctions.

const userStoreKey = OIDCLoginProviderStorage.getUserStoreKey();
const apiTokenStorageKey = OIDCLoginProviderStorage.apiTokenStorageKey;
const permissionsStorageKey = OIDCLoginProviderStorage.permissionsStorageKey;
const selectedProjectStorageKey =
  OIDCLoginProviderStorage.selectedProjectStorageKey;

const getOidcUserData = (oidcUser: OIDCUserProfileType) =>
  generateOIDCUserData(oidcUser);
const getApiToken = (userData: OIDCUserDataType) => {
  const { apiToken } = generateApiTokens(userData);
  return apiToken;
};

const storeOIDCUserResponse = ClientFunction(
  (oidcUserData: OIDCUserDataType) => {
    // eslint-disable-next-line no-console
    console.info('Storing the OIDC user response.', {
      userStoreKey,
      oidcUserData,
    });
    window.localStorage.setItem(userStoreKey, JSON.stringify(oidcUserData));
  },
  {
    dependencies: { userStoreKey },
  }
);

const storeApiToken = ClientFunction(
  (apiToken: string) => {
    // eslint-disable-next-line no-console
    console.info('Storing the API token.', {
      apiTokenStorageKey,
      apiToken,
    });
    window.localStorage.setItem(apiTokenStorageKey, apiToken);
  },
  {
    dependencies: { apiTokenStorageKey },
  }
);

const storePermissions = ClientFunction(
  (permissions: PermissionsStoragePermission, projectId: string | null) => {
    // eslint-disable-next-line no-console
    console.info('Storing the API token.', {
      permissionsStorageKey,
      permissions,
      selectedProjectStorageKey,
      projectId,
    });
    window.sessionStorage.setItem(
      permissionsStorageKey,
      JSON.stringify(permissions)
    );
    projectId &&
      window.localStorage.setItem(selectedProjectStorageKey, projectId);
  },
  {
    dependencies: { permissionsStorageKey, selectedProjectStorageKey },
  }
);

const hasAuthExpired = ClientFunction(
  () => {
    // eslint-disable-next-line no-console
    console.info('Checking whether the authorization has expired!', {
      userStoreKey,
    });
    try {
      const userResponseAsString = window.localStorage.getItem(userStoreKey);
      const storedUserResponse = JSON.parse(userResponseAsString ?? '');
      const hasExpired = storedUserResponse?.expires_at * 1000 < Date.now();
      if (hasExpired) {
        // eslint-disable-next-line no-console
        console.warn('The authorization has expired!');
      }
      return hasExpired;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Could not read a token from the session storage', e);
      return true;
    }
  },
  { dependencies: { userStoreKey } }
);

/**
 * Handle the authProvider.checkAuth needs:
 *
 * - If the oidcUser has any ad_groups (that gives some admin privileges),
 * then the permissions should be set so that the user has an admin role.
 * and the permissions set in the projects map.
 *
 * - Else, the role can be set to 'none', so that it indicates that
 * the user has no admin role at all.
 * @param oidcUser
 */
const _handleReactAdminPermissions = async (oidcUserData: OIDCUserDataType) => {
  const oidcUser = oidcUserData.profile;
  const apiToken = getApiToken(oidcUserData);
  let projectId: string | null = null;
  if (Array.isArray(oidcUser.ad_groups) && oidcUser.ad_groups.length > 0) {
    projectId = await fetchBrowserTestProjectIdFromAPI(apiToken);

    if (!projectId) {
      // eslint-disable-next-line no-console
      console.error(
        `Could not fetch browser test project's projectId from Kukkuu API for user ${oidcUser.sub}.`,
        { apiToken, oidcUser }
      );
      throw new Error(
        `Could not fetch browser test project's projectId from Kukkuu API for user ${oidcUser.sub}.`
      );
    }

    const permissions: PermissionsStoragePermission = {
      role: 'admin', // 'admin' as in authorizationService.getRole
      projects: {
        // All project permissions, see authorizationService.fetchRole
        [projectId]: [
          'publish',
          'manageEventGroups',
          'canSendToAllInProject',
          'viewFamilies',
        ],
      },
    };
    // eslint-disable-next-line no-console
    console.info(
      `Set the user role to ${permissions.role} and give the following permissions to projects `,
      { projectId, permissions_projects: permissions.projects }
    );
    // eslint-disable-next-line no-console
    console.debug(
      'Call storePermissions',
      'ClientFunction',
      'admin permissions',
      {
        permissions,
        projectId,
        permissionsStorageKey,
        selectedProjectStorageKey,
      }
    );
    await storePermissions(permissions, projectId);
  } else {
    // eslint-disable-next-line no-console
    console.info(
      'Set the user role to "none" and give an empty set of projects.'
    );

    const permissions: PermissionsStoragePermission = {
      role: 'none', // 'none' as in authorizationService.getRole
      projects: {}, // {} as in authorizationService.fetchRole
    };
    // eslint-disable-next-line no-console
    console.debug('Call storePermissions', 'ClientFunction', 'no permissions', {
      permissions,
      projectId,
      permissionsStorageKey,
      selectedProjectStorageKey,
    });
    await storePermissions(permissions, projectId);
  }
};

/**
 * Authorize the user with a symmetrically signed test JWT
 * that is generated only for the browser test purposes.
 * Fill in the locale storage and the session storage with
 * all the mandatory login related data.
 */
export const authorize = async (
  t: TestController,
  oidcUser: OIDCUserProfileType = browserTestAdminUser
) => {
  hasAuthExpired.with({ boundTestRun: t });
  storeOIDCUserResponse.with({ boundTestRun: t });
  storeApiToken.with({ boundTestRun: t });
  storePermissions.with({ boundTestRun: t });
  // eslint-disable-next-line no-console
  console.info('Handle the authorization JWT...');
  const hasExpired = await hasAuthExpired();
  if (hasExpired) {
    // eslint-disable-next-line no-console
    console.info(
      'Persisting test JWT to session storage to authorize the user to bypass the login process!',
      {
        userStoreKey,
        oidcUser,
      }
    );
    const oidcUserData = getOidcUserData(oidcUser);
    // eslint-disable-next-line no-console
    console.debug('Store OIDC data', {
      oidcUserData: JSON.stringify(oidcUserData),
      userStoreKey,
      apiTokenStorageKey,
      permissionsStorageKey,
      selectedProjectStorageKey,
    });
    await new Promise<void>(async (resolve) => {
      await storeOIDCUserResponse(oidcUserData);
      await storeApiToken(getApiToken(oidcUserData));
      await _handleReactAdminPermissions(oidcUserData);
      resolve();
    });
    // eslint-disable-next-line no-console
    console.info(
      'The browser storage has now been populated with OIDC related data!'
    );
  }
  // eslint-disable-next-line no-console
  console.info('Authorization finihed!');
};
