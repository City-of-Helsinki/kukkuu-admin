import authService from './authService';
import isUnexpiredToken from './isUnexpiredToken';

export const refreshAuth = async (): Promise<void> => {
  const accessToken = authService.getToken();
  const refreshToken = authService.getRefreshToken();
  if (!isUnexpiredToken(accessToken) && isUnexpiredToken(refreshToken)) {
    await authService.renewToken();
  }
};
