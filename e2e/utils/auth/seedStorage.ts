import { generateOIDCUserData, generateApiTokens } from '../jwt/oidc';
import { fetchBrowserTestProjectIdFromAPI } from '../jwt/services';
import OIDCLoginProviderStorage from '../jwt/storage';
import type {
  OIDCUserProfileType,
  PermissionsStoragePermission,
} from '../jwt/types';

export type StorageSeed = {
  localStorage: Record<string, string>;
  sessionStorage: Record<string, string>;
};

/**
 * Build the localStorage + sessionStorage payloads needed to authenticate a user
 * without going through the real OIDC login flow.
 *
 * Mirrors the logic in browser-tests/utils/jwt/clientUtils/login.ts but runs
 * entirely on the Node side — no ClientFunction wrappers needed.
 */
export async function buildStorageSeed(
  user: OIDCUserProfileType
): Promise<StorageSeed> {
  const oidcUserData = generateOIDCUserData(user);
  const { apiToken } = generateApiTokens(oidcUserData);

  const userStoreKey = OIDCLoginProviderStorage.getUserStoreKey();

  const localStorageItems: Record<string, string> = {
    [userStoreKey]: JSON.stringify(oidcUserData),
    [OIDCLoginProviderStorage.apiTokenStorageKey]: apiToken,
  };

  let permissions: PermissionsStoragePermission;
  let projectId: string | null = null;

  if (Array.isArray(user.ad_groups) && user.ad_groups.length > 0) {
    projectId = await fetchBrowserTestProjectIdFromAPI(apiToken);

    if (!projectId) {
      throw new Error(
        `Could not fetch browser test projectId from Kukkuu API for user ${user.sub}.`
      );
    }

    localStorageItems[OIDCLoginProviderStorage.selectedProjectStorageKey] =
      projectId;

    permissions = {
      role: 'admin',
      projects: {
        [projectId]: [
          'publish',
          'manageEventGroups',
          'canSendToAllInProject',
          'viewFamilies',
        ],
      },
    };
  } else {
    permissions = {
      role: 'none',
      projects: {},
    };
  }

  return {
    localStorage: localStorageItems,
    sessionStorage: {
      [OIDCLoginProviderStorage.permissionsStorageKey]:
        JSON.stringify(permissions),
    },
  };
}
