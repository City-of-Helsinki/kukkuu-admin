import { screen } from '@testing-library/testcafe';
import { Selector } from 'testcafe';

export const ssoLogin = {
  loginLink: screen.getByText('Helsinki-tunnus'),
  username: screen.getByLabelText('Email'),
  password: screen.getByLabelText('Password'),
  loginButton: screen.getByDisplayValue('Log In'),
  permissionPage: screen.queryByText('Permission request'),
  givePermissionButton: screen.getByDisplayValue('Allow'),
  localeDropdown: Selector('#kc-locale-dropdown'),
  localeLanguage: 'English',
};
