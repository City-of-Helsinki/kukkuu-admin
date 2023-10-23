import { Selector } from 'testcafe';

export const navigation = {
  messages: Selector('.MuiButtonBase-root.MuiMenuItem-root').withAttribute(
    'href',
    '/messages'
  ),
  events: Selector('.MuiButtonBase-root.MuiMenuItem-root').withAttribute(
    'href',
    '/events-and-event-groups'
  ),
};
