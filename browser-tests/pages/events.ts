import { Selector } from 'testcafe';
import { screen } from '@testing-library/testcafe';

import { selectOption } from './select';

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

export const eventsCreatePage = {
  title: Selector('h1').withExactText('Luo tapahtuma'),
  nameInput: screen.getByLabelText('Nimi *'),
  participantsPerInviteSelect: screen.getByLabelText(
    'Osallistujat kutsua kohden *'
  ),
  capacityPerOccurrence: screen.getByLabelText('Esiintymän kapasiteetti *'),
  submitButton: screen.getByRole('button', { name: 'Tallenna' }),
};

type CreateEvent = {
  name: string;
  participantsPerInvite: string;
  capacityPerOccurrence: number;
};

export async function fillCreationForm(t: TestController, event: CreateEvent) {
  await t.typeText(eventsCreatePage.nameInput, event.name);
  await selectOption(
    t,
    eventsCreatePage.participantsPerInviteSelect,
    event.participantsPerInvite
  );
  await t.typeText(
    eventsCreatePage.capacityPerOccurrence,
    event.capacityPerOccurrence.toString()
  );
}
