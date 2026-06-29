import type { Page } from '@playwright/test';

export function messagesListPage(page: Page) {
  return {
    title: page.getByRole('heading', { name: 'Viestit', exact: true }),
    listHeader: page.locator('.MuiTableHead-root > .MuiTableRow-root'),
    listBody: page.locator('.MuiTableBody-root'),
    createMessageLink: page.getByRole('link', {
      name: /uusi sähköpostiviesti/i,
    }),
    createMessageSmsLink: page.getByRole('link', {
      name: /uusi tekstiviesti/i,
    }),
  };
}

export function messagesCreatePage(page: Page) {
  return {
    title: page.getByText('Uusi sähköpostiviesti'),
    // MUI Select renders the interactive element as role="combobox"; the
    // accessible name comes from the InputLabel without the required-marker
    // asterisk. Matches the pattern used in e2e/pages/events.ts.
    recipientSelectionInput: page.getByRole('combobox', {
      name: 'Vastaanottajat',
    }),
    subjectInput: page.getByLabel('Viestin otsikko *'),
    bodyTextInput: page.getByLabel('Viestin teksti *'),
    submitCreateMessageForm: page.getByRole('button', { name: 'Tallenna' }),
    submitAndSendMessage: page.getByRole('button', { name: 'Lähetä' }),
  };
}

export function messagesShowPage(page: Page) {
  return {
    // The subject appears in both the page heading and inside a card body —
    // .first() mirrors the source's getAllByText (which only used the
    // "All" variant to silence the strict multi-match throw).
    title: (subject: string) => page.getByText(subject).first(),
    sendMessageButton: page.getByRole('button', { name: 'Lähetä' }),
    sendConfirmModalConfirmButton: page.getByRole('button', {
      name: 'Vahvista',
    }),
    editMessageLink: page.getByRole('link', { name: 'Muokkaa' }),
    isSent: page.getByText('Lähetetty'),
  };
}

export function messagesEditPage(page: Page) {
  return {
    title: (subject: string) => page.getByText(subject).first(),
    deleteMessageButton: page.getByRole('button', { name: 'Poista' }),
    deleteConfirmModalConfirmButton: page.getByRole('button', {
      name: 'Vahvista',
    }),
  };
}
