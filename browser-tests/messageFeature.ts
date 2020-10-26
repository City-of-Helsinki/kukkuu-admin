import { within } from '@testing-library/testcafe';

import { routes } from './pages/routes';
import { login } from './utils/login';
import { navigation } from './pages/navigation';
import {
  messagesListPage,
  messagesCreatePage,
  messagesShowPage,
  messagesEditPage,
} from './pages/messages';
import { includesHeaders } from './utils/valueUtils';

function buildTestMessage() {
  return {
    subject: `Browser test message ${new Date().toJSON()}`,
    bodyText: 'Test body text',
  };
}

fixture`Messages feature`
  // This doesn't actually do anything as the test is always begun
  // from /login due to missing authentication. However, we have to
  // specify a page, otherwise we will face an error.
  .page(routes.messagesList())
  .beforeEach(async (t) => {
    await login(t);

    // Wait for authorization to finish
    await t.wait(3000); // 3s

    await t.click(navigation.messages);

    // Add a test message to context
    t.ctx.message = buildTestMessage();
  })
  .afterEach(async (t) => {
    // Clean test message from context
    delete t.ctx.message;
  });

test('As a user I can see a list of messages', async (t) => {
  // The list displays the expected fields
  await t
    .expect(messagesListPage.listHeader.filter(includesHeaders).exists)
    .ok();

  // The list has content
  await t.expect(messagesListPage.listBody.childElementCount).gt(0);
});

test('As a user I can create and delete messages', async (t) => {
  // From message list view go into create message view
  await t.click(messagesListPage.createMessageLink);

  // Assert that we are in create message view
  await t.expect(messagesCreatePage.title.exists).ok();

  // Fill in subject and body fields, then submit the form
  await t
    .typeText(messagesCreatePage.subjectInput, t.ctx.message.subject)
    .typeText(messagesCreatePage.bodyTextInput, t.ctx.message.bodyText)
    .click(messagesCreatePage.submitCreateMessageForm);

  // Assert that we have been redirected into the list view
  await t.expect(messagesListPage.title.exists).ok();

  const messageSelector = within(messagesListPage.listBody).queryAllByText(
    t.ctx.message.subject
  );

  // Assert that the new message can be found
  await t.expect(messageSelector.exists).ok();

  // Go into message show view
  await t.click(messageSelector);

  // Assert that we are in the show view
  await t.expect(messagesShowPage.title(t.ctx.message.subject).exists).ok();

  // Sent messages can't be deleted from the UI so we do not actually
  // send the message, but instead check that the action is there and
  // that there's a confirmation modal.
  await t.click(messagesShowPage.sendMessageButton);
  // Expect to see confirmation modal and a confirm button
  await t.expect(messagesShowPage.sendConfirmModalConfirmButton.exists).ok();
  // Close the modal
  await t.pressKey('esc');

  // Go to edit view
  await t.click(messagesShowPage.editMessageLink);

  // Assert that we are in the edit view
  await t.expect(messagesEditPage.title(t.ctx.message.subject).exists).ok();

  // Delete the message
  await t
    .click(messagesEditPage.deleteMessageButton)
    .click(messagesEditPage.deleteConfirmModalConfirmButton);

  // Assert that we have been redirected into the list view
  await t.expect(messagesListPage.title.exists).ok();

  // Wait for UI cache to refresh (needed in headless mode)
  await t.wait(1000); // 1s

  // Assert that the new message can no longer be found
  await t.expect(messageSelector.exists).notOk();
});
