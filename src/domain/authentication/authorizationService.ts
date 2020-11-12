import dataProvider from '../../api/dataProvider';
import { setAdminProfile } from '../profile/utils';

export const PERMISSIONS = 'permissions';

export class AuthorizationService {
  constructor() {
    this.fetchRole = this.fetchRole.bind(this);
    this.isAuthorized = this.isAuthorized.bind(this);
    this.getRole = this.getRole.bind(this);
    this.clear = this.clear.bind(this);
  }

  async fetchRole(): Promise<void> {
    try {
      const { data } = await dataProvider.getMyAdminProfile();

      setAdminProfile(data as any);
      sessionStorage.setItem(PERMISSIONS, 'admin');
    } catch (e) {
      sessionStorage.setItem(PERMISSIONS, 'none');
    }
  }

  isAuthorized(): boolean {
    return sessionStorage.getItem(PERMISSIONS) !== null;
  }

  getRole(): string | null {
    return sessionStorage.getItem(PERMISSIONS);
  }

  clear() {
    sessionStorage.removeItem(PERMISSIONS);
  }
}

export default new AuthorizationService();
