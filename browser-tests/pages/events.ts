import { Selector } from 'testcafe';
import { screen } from '@testing-library/testcafe';

export const eventsListPage = {
  title: Selector('h1').withExactText('Tapahtumat'),
  listBody: Selector('.MuiTableBody-root'),
  anyEventGroup: Selector('.MuiTableBody-root tr').withText('TAPAHTUMARYHMÄ'),
  eventOrEventGroupByName: (name) =>
    Selector('.MuiTableBody-root tr td:first-child').withExactText(name),
  createEventGroupButton: screen.getByRole('button', {
    name: 'Uusi tapahtumaryhmä',
  }),
};

export const eventsDetailPage = {
  breadcrumbs: Selector('.MuiBreadcrumbs-ol .MuiBreadcrumbs-li a'),
};
