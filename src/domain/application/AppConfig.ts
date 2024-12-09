/**
 * Centralized application configuration fetched from environment variables.
 *
 * This class provides static accessors for various configuration values, primarily
 * related to OIDC (OpenID Connect) authentication and the GraphQL API endpoint.
 * It ensures that required environment variables are defined and throws errors if not.
 */
class AppConfig {
  /**
   * GraphQL API base URL.
   * @example 'https://kukkuu.api.hel.fi/graphql'
   * @throws {Error} If the `VITE_API_URI` environment variable is not defined.
   */
  static get apiUrl() {
    return getEnvOrError(import.meta.env.VITE_API_URI, 'VITE_API_URI');
  }

  /**
   * OIDC authority URL.
   * @throws {Error} If the `VITE_OIDC_AUTHORITY` environment variable is not defined.
   */
  static get oidcAuthority() {
    const origin = getEnvOrError(
      import.meta.env.VITE_OIDC_AUTHORITY,
      'VITE_OIDC_AUTHORITY'
    );
    return new URL(origin).href;
  }

  /**
   * OIDC audience(s) (space-separated if multiple).
   * @example
   * // Tunnistamo: (leave the env var empty)
   * VITE_OIDC_AUDIENCES=
   * // Keycloak:
   * VITE_OIDC_AUDIENCES='audience1 audience2'
   */
  static get oidcAudience() {
    return import.meta.env.VITE_OIDC_AUDIENCES;
  }

  /**
   * OIDC client ID for the Kukkuu UI.
   * @throws {Error} If the `VITE_OIDC_CLIENT_ID` environment variable is not defined.
   */
  static get oidcClientId() {
    return getEnvOrError(
      import.meta.env.VITE_OIDC_CLIENT_ID,
      'VITE_OIDC_CLIENT_ID'
    );
  }

  /**
   * OIDC auth scope(s) (space-separated if multiple).
   * @throws {Error} If the `VITE_OIDC_SCOPE` environment variable is not defined.
   */
  static get oidcScope() {
    return getEnvOrError(import.meta.env.VITE_OIDC_SCOPE, 'VITE_OIDC_SCOPE,');
  }

  /**
   * Indicates the type of OIDC server being used.
   *
   * This is not a standard OIDC client attribute; it's used internally to determine
   * the appropriate configuration for the login provider.
   *
   * @default "code"
   */
  static get oidcReturnType() {
    // "code" for authorization code flow.
    return import.meta.env.VITE_OIDC_RETURN_TYPE ?? 'code';
  }

  /**
   * OIDC client ID specifically for the Kukkuu API.
   *
   * This is the client ID that the Kukkuu API recognizes when authenticating
   * requests from the UI. It defaults to the `oidcKukkuuAPIScope` if the environment
   * variable `VITE_OIDC_KUKKUU_API_CLIENT_ID` is not defined.
   *
   * @returns {string} The client ID for the Kukkuu API.
   */
  static get oidcKukkuuApiClientId() {
    return (
      import.meta.env.VITE_OIDC_KUKKUU_API_CLIENT_ID ?? this.oidcKukkuuAPIScope
    );
  }

  /**
   * URL for obtaining access tokens for the Kukkuu API.
   *
   * This dynamically determines the correct endpoint based on the `oidcServerType`:
   * - If the OIDC server is Keycloak, it uses the `/protocol/openid-connect/token` endpoint.
   * - If the OIDC server is Tunnistamo, it uses the `/api-tokens/` endpoint.
   *
   * @returns {string} The URL for obtaining Kukkuu API access tokens.
   */
  static get oidcKukkuuApiTokensUrl() {
    return this.oidcServerType === 'KEYCLOAK'
      ? `${this.oidcAuthority}protocol/openid-connect/token`
      : `${this.oidcAuthority}api-tokens/`;
  }

  /**
   * OIDC scope(s) (space-separated if multiple) specifically required for accessing the Kukkuu API.
   *
   * These scopes define the permissions that the Kukkuu UI needs to request from the OIDC provider
   * in order to interact with the Kukkuu API.
   *
   * @throws {Error} If the `VITE_KUKKUU_API_OIDC_SCOPE` environment variable is not defined.
   * @returns {string} The OIDC scope(s) required for the Kukkuu API.
   */
  static get oidcKukkuuAPIScope() {
    return getEnvOrError(
      import.meta.env.VITE_KUKKUU_API_OIDC_SCOPE,
      'VITE_KUKKUU_API_OIDC_SCOPE'
    );
  }

  /**
   * Indicates the type of OIDC server being used.
   *
   * This is not a standard OIDC client attribute; it's used internally to determine
   * the appropriate configuration for the login provider.
   *
   * @throws {Error} If the `VITE_OIDC_SERVER_TYPE` environment variable is not defined
   *                or has an invalid value (not 'KEYCLOAK' or 'TUNNISTAMO').
   */
  static get oidcServerType(): 'KEYCLOAK' | 'TUNNISTAMO' {
    const oidcServerType =
      import.meta.env.VITE_OIDC_SERVER_TYPE ?? 'TUNNISTAMO';
    if (oidcServerType === 'KEYCLOAK' || oidcServerType === 'TUNNISTAMO') {
      return oidcServerType;
    }
    throw new Error(`Invalid OIDC server type: ${oidcServerType}`);
  }

  /**
   * Read env variable `VITE_OIDC_AUTOMATIC_SILENT_RENEW_ENABLED`.
   * Defaults to true.
   * */
  static get oidcAutomaticSilentRenew(): boolean {
    return Boolean(
      import.meta.env.VITE_OIDC_AUTOMATIC_SILENT_RENEW_ENABLED ?? true
    );
  }

  /**
   * Read env variable `VITE_OIDC_SESSION_POLLING_INTERVAL_MS`.
   * Defaults to 60000.
   * */
  static get oidcSessionPollerIntervalInMs(): number {
    return (
      Number(import.meta.env.VITE_OIDC_SESSION_POLLING_INTERVAL_MS) || 60000
    );
  }

  /**
   * Read env variable `VITE_IDLE_TIMEOUT_IN_MS`.
   * Defaults to 60 minutes.
   * */
  static get userIdleTimeoutInMs(): number {
    return Number(import.meta.env.VITE_IDLE_TIMEOUT_IN_MS) || 3_600_000;
  }
}

// Accept both variable and name so that variable can be correctly replaced
// by build.
// process.env.VAR => value
// process.env["VAR"] => no value
// Name is used to make debugging easier.
function getEnvOrError(variable?: string, name?: string) {
  if (!variable) {
    throw Error(`Environment variable with name ${name} was not found`);
  }
  return variable;
}

export default AppConfig;
