import { Selector } from 'testcafe';

export const eventsListPage = {
  listBody: Selector('.MuiTableBody-root'),
  anyEventGroup: Selector('.MuiTableBody-root tr').withText('TAPAHTUMARYHMÄ'),
};

export const eventsDetailPage = {
  breadcrumbs: Selector('.MuiBreadcrumbs-ol .MuiBreadcrumbs-li a'),
};
