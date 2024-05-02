class AppConfig {
  static get apiUrl() {
    return getEnvOrError(process.env.REACT_APP_API_URI, 'REACT_APP_API_URI');
  }

  static get oidcAuthority() {
    const origin = getEnvOrError(
      process.env.REACT_APP_OIDC_AUTHORITY,
      'REACT_APP_OIDC_AUTHORITY'
    );
    return new URL(origin).href;
  }

  /**
   * The audiences used in the OIDC.
   * 
   * @example
   * // In Tunnistamo it can be left as undefined, 
   * // because it is not included in the request done bythe OIDC client.
   * ["https://api.hel.fi/auth/kukkuu"]
   * // In Keycloak:
   * [
        'kukkuu-api-test',
        'profile-api-test',
      ]
   */
  static get oidcAudience() {
    return process.env.REACT_APP_OIDC_AUDIENCES;
  }

  static get oidcClientId() {
    return getEnvOrError(
      process.env.REACT_APP_OIDC_CLIENT_ID,
      'REACT_APP_OIDC_CLIENT_ID'
    );
  }

  static get oidcScope() {
    return getEnvOrError(
      process.env.REACT_APP_OIDC_SCOPE,
      'REACT_APP_OIDC_SCOPE,'
    );
  }

  static get oidcReturnType() {
    // "code" for authorization code flow.
    return process.env.REACT_APP_OIDC_RETURN_TYPE ?? 'code';
  }

  static get oidcKukkuuApiClientId() {
    return (
      process.env.REACT_APP_OIDC_KUKKUU_API_CLIENT_ID ?? this.oidcKukkuuAPIScope
    );
  }

  static get oidcKukkuuApiTokensUrl() {
    return this.oidcServerType === 'KEYCLOAK'
      ? `${this.oidcAuthority}protocol/openid-connect/token`
      : `${this.oidcAuthority}api-tokens/`;
  }

  static get oidcKukkuuAPIScope() {
    return getEnvOrError(
      process.env.REACT_APP_KUKKUU_API_OIDC_SCOPE,
      'REACT_APP_KUKKUU_API_OIDC_SCOPE'
    );
  }

  /**
   * NOTE: The oidcServerType is not an OIDC client attribute.
   * It's purely used to help to select a configuration for the LoginProvider.
   * */
  static get oidcServerType(): 'KEYCLOAK' | 'TUNNISTAMO' {
    const oidcServerType =
      process.env.REACT_APP_OIDC_SERVER_TYPE ?? 'TUNNISTAMO';
    if (!['KEYCLOAK', 'TUNNISTAMO'].includes(oidcServerType)) {
      throw new Error(`Invalid OIDC server type: ${oidcServerType}`);
    }
    return oidcServerType as 'KEYCLOAK' | 'TUNNISTAMO';
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
