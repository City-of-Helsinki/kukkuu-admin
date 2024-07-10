import type { Algorithm } from 'jsonwebtoken';

class BrowserTestJWTConfig {
  static jwtSignAlgorithm: Algorithm = 'HS256';
  /**
   * WARNING: Be careful and try not to leak the JWT signing key!
   * Sign the JWT in server or locally and never share it to the browser end.
   * The shared key should be 256 bits.
   */
  private static _jwtSigningSecret: string | null = null;

  /**
   * Kukkuu API's OpenID Connect (OIDC) client ID.
   *
   * Used to identify the Kukkuu API when interacting with the OIDC service.
   *
   * @example
   * // In your environment:
   * REACT_APP_OIDC_KUKKUU_API_CLIENT_ID='kukkuu-api-dev'
   */
  static get oidcApiClientId() {
    return this.getEnvOrError(
      'REACT_APP_OIDC_KUKKUU_API_CLIENT_ID',
      'Kukkuu API OIDC client ID'
    );
  }

  /**
   * The base URL (authority) of the OIDC authentication service.
   *
   * This is the root URL where the OIDC server is hosted.
   *
   * @example
   * // In your environment:
   * REACT_APP_OIDC_AUTHORITY='https://tunnistus.test.hel.ninja/auth/realms/helsinki-tunnistus/'
   */
  static get oidcAuthority() {
    return this.getEnvOrError('REACT_APP_OIDC_AUTHORITY', 'OIDC Authority');
  }

  /**
   * This UI application's OpenID Connect (OIDC) client ID.
   *
   * Used to identify this specific UI application when interacting with the OIDC service.
   *
   * @example
   * // In your environment:
   * REACT_APP_OIDC_CLIENT_ID='kukkuu-admin-ui-dev'
   */
  static get oidcClientId() {
    return this.getEnvOrError('REACT_APP_OIDC_CLIENT_ID', 'OIDC Client ID');
  }

  /**
   * The URL for retrieving OIDC configuration details.
   *
   * This endpoint provides information about the OIDC service, including endpoints and supported capabilities.
   *
   * It is automatically constructed based on the `oidcAuthority`.
   */
  static get oidcConfigurationEndpoint() {
    return `${this.oidcAuthority}.well-known/openid-configuration`;
  }

  /**
   * The GraphQL endpoint for the Kukkuu API.
   *
   * This is the URL used to interact with the Kukkuu API using GraphQL queries and mutations.
   *
   * @example
   * // In your environment:
   * REACT_APP_API_URI='https://kukkuu.api.test.hel.ninja/graphql'
   */
  static get kukkuuApiGraphqlEndpoint() {
    return this.getEnvOrError('REACT_APP_API_URI', 'Kukkuu API URI');
  }

  /**
   * The AD group that gives the user group
   * and it's browser testing permissions for the user.
   */
  static get browserTestADGroup(): string {
    return this.getEnvOrError(
      'BROWSER_TESTS_JWT_AD_GROUP',
      'Kukkuu API AD Group for browser testing'
    );
  }

  /**
   * Retrieves the JWT signing secret, fetching it from the environment only once.
   */
  static get jwtSigningSecret(): string {
    if (!this._jwtSigningSecret) {
      this._jwtSigningSecret = this.getEnvOrError(
        'BROWSER_TESTS_JWT_SIGN_SECRET',
        'Shared test JWT signing secret'
      );
    }
    return this._jwtSigningSecret;
  }

  /**
   * Retrieves an environment variable's value or throws an error if not found.
   *
   * @param {string} variableName - The name of the environment variable.
   * @param {string} friendlyName - A human-readable name for error messages.
   * @throws {Error} If the environment variable is not defined.
   * @returns {string} The value of the environment variable.
   */
  static getEnvOrError(variableName: string, friendlyName: string): string {
    const value = process.env[variableName];
    if (!value) {
      throw new Error(
        `Environment variable "${friendlyName}" (${variableName}) not found`
      );
    }
    return value;
  }
}

export default BrowserTestJWTConfig;
