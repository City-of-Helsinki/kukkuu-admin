import BrowserTestJWTConfig from './config';

class OIDCLoginProviderStorage {
  /** The key where the Kukkuu API token (JWT) is stored. */
  static apiTokenStorageKey = 'apiToken';
  /** The key where the React-admin permissions are stored. */
  static permissionsStorageKey = 'permissions';
  /** The key where the id of the currently selected project is stored. */
  static selectedProjectStorageKey = 'projectId';

  /**
   * Get the session storage key for the user data.
   *
   * @param oidcAuthority OIDC authority (used in JWT)
   * @param oidcClientId OIDC client id (used in JWT)
   * @returns session storage key
   */
  static getUserStoreKey(
    oidcAuthority = BrowserTestJWTConfig.oidcAuthority,
    oidcClientId = BrowserTestJWTConfig.oidcClientId
  ): string {
    return `oidc.user:${oidcAuthority}:${oidcClientId}`;
  }
}

export default OIDCLoginProviderStorage;
