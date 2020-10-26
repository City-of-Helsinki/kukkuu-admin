import { Selector } from 'testcafe';

export const navigation = {
  messages: Selector(
    '.MuiButtonBase-root.MuiListItem-root.MuiMenuItem-root'
  ).withAttribute('href', '/messages'),
};
