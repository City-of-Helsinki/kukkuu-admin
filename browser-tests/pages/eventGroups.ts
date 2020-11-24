import { Selector } from 'testcafe';
import { screen } from '@testing-library/testcafe';

export const eventGroupsDetailPage = {
  title: Selector('h1'),
  eventListHeader: Selector('.MuiTableHead-root > .MuiTableRow-root'),
  eventList: Selector('.MuiTableBody-root'),
  breadcrumbs: Selector('.MuiBreadcrumbs-ol .MuiBreadcrumbs-li a'),
  editButton: screen.getByRole('button', { name: 'Muokkaa' }),
  addEventToEventGroupButton: screen.getByRole('button', {
    name: 'Lisää tapahtuma',
  }),
  getEventGroup: (name: string) =>
    Selector('.MuiTableBody-root tr td:first-child').withExactText(name),
};

export const eventGroupsCreatePage = {
  nameInput: screen.getByLabelText('Nimi *'),
  shortDescriptionInput: screen.getByLabelText('Lyhyt kuvaus'),
  descriptionInput: screen.getByLabelText('Kuvaus'),
  submitButton: screen.getByRole('button', { name: 'Tallenna' }),
};

export const eventGroupsEditPage = {
  shortDescriptionInput: screen.getByLabelText('Lyhyt kuvaus'),
  saveButton: screen.getByRole('button', { name: 'Tallenna' }),
  deleteButton: screen.getByRole('button', { name: 'Poista' }),
  confirmDeleteButton: screen.getByRole('button', { name: 'Vahvista' }),
};
