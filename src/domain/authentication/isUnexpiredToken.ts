import type { JwtPayload } from 'jwt-decode';
import { InvalidTokenError, jwtDecode } from 'jwt-decode';

const isUnexpiredToken = (token?: string | null): boolean => {
  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    const secondsSinceEpoch = Date.now() / 1000;
    return (
      decodedToken.exp !== undefined && decodedToken.exp >= secondsSinceEpoch
    );
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      return false;
    }
    throw error;
  }
};

export default isUnexpiredToken;
