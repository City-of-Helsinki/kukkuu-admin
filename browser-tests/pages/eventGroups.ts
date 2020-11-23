import { Selector } from 'testcafe';

export const eventGroupsDetailPage = {
  title: Selector('h1'),
  eventListHeader: Selector('.MuiTableHead-root > .MuiTableRow-root'),
  eventList: Selector('.MuiTableBody-root'),
};
