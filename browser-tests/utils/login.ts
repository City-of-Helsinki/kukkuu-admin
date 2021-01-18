import { ssoLogin } from '../pages/ssoLogin';
import { login as loginPage } from '../pages/login';
import { testUsername, testUserPassword } from './settings';

type Options = {
  username?: string;
  password?: string;
}

export const login = async (t: TestController, options: Options = {}) => {
  const { username = testUsername(), password = testUserPassword()} = options;
  await t
    .click(loginPage.loginButton)
    .click(ssoLogin.loginLink)
    .typeText(ssoLogin.username, username)
    .typeText(ssoLogin.password, password)
    .click(ssoLogin.loginButton)
    // Wait for authorization to finish
    .wait(3000); // 3s
};
