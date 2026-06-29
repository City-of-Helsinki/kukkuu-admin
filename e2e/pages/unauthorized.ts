import type { Page } from '@playwright/test';

export const unauthorizedPage = (page: Page) => ({
  title: page.getByText('Ei käyttöoikeutta'),
  logoutButton: page.getByRole('button', { name: 'Kirjaudu ulos' }),
});
