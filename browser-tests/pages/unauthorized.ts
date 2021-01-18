import { screen } from '@testing-library/testcafe';

export const unauthorized = {
  title: screen.getByText('Ei käyttöoikeutta'),
  logout: screen.getByRole('button', { name: 'Kirjaudu ulos'  }),
};
