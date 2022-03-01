import { Selector } from 'testcafe';
import { screen } from '@testing-library/testcafe';

export const messagesListPage = {
  listHeader: Selector('.MuiTableHead-root > .MuiTableRow-root'),
  listBody: Selector('.MuiTableBody-root'),
  createMessageLink: screen.getByText('Uusi sähköpostiviesti'),
  title: Selector('h1').withExactText('Viestit'),
  createMessageSmsLink: screen.getByText('Uusi tekstiviesti'),
};

export const messagesCreatePage = {
  title: screen.getByText('Uusi sähköpostiviesti'),
  subjectInput: screen.getByLabelText('Viestin otsikko *'),
  bodyTextInput: screen.getByLabelText('Viestin teksti *'),
  submitCreateMessageForm: screen.getByText('Tallenna'),
};

export const messagesShowPage = {
  title: (subject: string) => screen.getAllByText(subject),
  sendMessageButton: screen.getByLabelText('Lähetä'),
  sendConfirmModalConfirmButton: screen.getByText('Vahvista'),
  editMessageLink: screen.getByText('Muokkaa'),
  isSent: screen.getByText('Lähetetty'),
};

export const messagesEditPage = {
  title: (subject: string) => screen.getByText(subject),
  deleteMessageButton: screen.getByText('Poista'),
  deleteConfirmModalConfirmButton: screen.getByText('Vahvista'),
};
