import { test, expect } from '@playwright/test';

import { setupAuth } from './utils/auth/setupAuth';
import { browserTestAdminUser } from './utils/jwt/users';
import { routes } from './pages/routes';
import { selectMuiOption } from './pages/select';
import {
  messagesListPage,
  messagesCreatePage,
  messagesShowPage,
  messagesEditPage,
} from './pages/messages';
import { installSmsMessageMock } from './utils/mocks/smsMessageMock';

type TestMessage = {
  recipientSelection: string;
  subject: string;
  bodyText: string;
};

function buildTestMessage(protocol = ''): TestMessage {
  const protocolLabel = protocol ? ` (${protocol})` : '';
  return {
    recipientSelection: 'Kaikki',
    subject: `Browser test message ${new Date().toJSON()}${protocolLabel}`,
    bodyText: `Test body text ${new Date().toJSON()}${protocolLabel}`,
  };
}

test.describe('Messages feature', () => {
  let message: TestMessage;
  let sms: TestMessage;

  test.beforeEach(async ({ page }) => {
    message = buildTestMessage();
    sms = buildTestMessage('sms');

    await setupAuth(page, browserTestAdminUser);
    await page.goto(routes.messagesList());
  });

  test('As an admin I want to see a list of messages', async ({ page }) => {
    const list = messagesListPage(page);

    // If the list is empty, create one message so the assertions are not
    // vacuous. Mirrors the same pattern in eventGroupsFeature.spec.ts.
    if ((await list.listBody.locator('tr').count()) === 0) {
      await list.createMessageLink.click();
      await expect(messagesCreatePage(page).title).toBeVisible();
      await selectMuiOption(
        page,
        messagesCreatePage(page).recipientSelectionInput,
        message.recipientSelection
      );
      await messagesCreatePage(page).subjectInput.fill(message.subject);
      await messagesCreatePage(page).bodyTextInput.fill(message.bodyText);
      await messagesCreatePage(page).submitCreateMessageForm.click();
      await expect(list.title).toBeVisible({ timeout: 15000 });
    }

    // The header row must contain every expected column label.
    const expectedHeaders = [
      'Viesti',
      'Vastaanottajat',
      'Tapahtuma',
      'Esiintymät',
      'Vastaanottajia',
      'Julkaisu',
    ];
    for (const col of expectedHeaders) {
      await expect(list.listHeader).toContainText(col);
    }

    // The body must have at least one row.
    await expect(list.listBody.locator('tr')).not.toHaveCount(0);
  });

  test('As an admin I want to create and delete messages', async ({ page }) => {
    const list = messagesListPage(page);
    const create = messagesCreatePage(page);
    const show = messagesShowPage(page);
    const edit = messagesEditPage(page);

    // From list view, go to create view
    await list.createMessageLink.click();
    await expect(create.title).toBeVisible();

    // Fill in the form and submit
    await selectMuiOption(
      page,
      create.recipientSelectionInput,
      message.recipientSelection
    );
    await create.subjectInput.fill(message.subject);
    await create.bodyTextInput.fill(message.bodyText);
    await create.submitCreateMessageForm.click();

    // After submit, react-admin redirects to the list view
    await expect(list.title).toBeVisible({ timeout: 10000 });

    // Find the newly created message by its body text inside the list body
    const messageLocator = list.listBody.getByText(message.bodyText);
    await expect(messageLocator).toBeVisible({ timeout: 10000 });

    // Open the show view
    await messageLocator.click();
    await expect(show.title(message.subject)).toBeVisible();

    // Sent messages can't be deleted from the UI, so we do not actually
    // send the message — only verify that the confirmation modal opens.
    await show.sendMessageButton.click();
    await expect(show.sendConfirmModalConfirmButton).toBeVisible();
    await page.keyboard.press('Escape');

    // Open the edit view
    await show.editMessageLink.click();
    await expect(edit.title(message.subject)).toBeVisible();

    // Delete the message
    await edit.deleteMessageButton.click();
    await edit.deleteConfirmModalConfirmButton.click();

    // Back on the list view, the message should no longer be present
    await expect(list.title).toBeVisible();
    await expect(messageLocator).toBeHidden({ timeout: 10000 });
  });

  test('As an admin I should be able to send SMS messages', async ({
    page,
  }) => {
    // Stub the GraphQL endpoint BEFORE the click that triggers the AddMessage
    // mutation, otherwise the dev backend would receive a real send request.
    await installSmsMessageMock(page);

    const list = messagesListPage(page);
    const create = messagesCreatePage(page);
    const show = messagesShowPage(page);

    await list.createMessageSmsLink.click();

    // SMS form: only recipient + body text; no subject
    await selectMuiOption(
      page,
      create.recipientSelectionInput,
      message.recipientSelection
    );
    await create.bodyTextInput.fill(sms.bodyText);
    await create.submitAndSendMessage.click();

    // Redirected back to list
    await expect(list.title).toBeVisible();

    // The mock returns 'Mocked bodyText' as the message body text in the list
    const smsLocator = list.listBody.getByText('Mocked bodyText');
    await expect(smsLocator).toBeVisible({ timeout: 10000 });

    // Open details
    await smsLocator.click();

    // Sent status must appear on the details page
    await expect(show.isSent).toBeVisible({ timeout: 10000 });
  });
});
