import { Selector } from 'testcafe';

export const eventsListPage = {
  listBody: Selector('.MuiTableBody-root'),
  anyEventGroup: Selector('.MuiTableBody-root').withText('TAPAHTUMARYHMÄ'),
};
