import { within, screen } from '@testing-library/testcafe';
import { fixture, RequestMock } from 'testcafe';

import { routes } from './pages/routes';
import { navigation } from './pages/navigation';
import {
  messagesListPage,
  messagesCreatePage,
  messagesShowPage,
  messagesEditPage,
} from './pages/messages';
import { includesHeaders } from './utils/valueUtils';
import {
  AuthServiceRequestInterceptor,
  KukkuuApiTestJwtBearerAuthorization,
} from './utils/jwt/mocks/testJWTAuthRequests';
import { browserTestAdminUser } from './utils/jwt/users';
import { authorizedAdmin } from './userRoles';
import BrowserTestJWTConfig from './utils/jwt/config';
import type { TestController } from './types';

// If we want to prevent the SMS message sending...
const preventSMSSending = true;

function buildTestMessage(protocol = '') {
  const protocolLabel = protocol ? ` (${protocol})` : '';

  return {
    recipientSelection: 'Kaikki',
    subject: `Browser test message ${new Date().toJSON()}${protocolLabel}`,
    bodyText: `Test body text ${new Date().toJSON()}${protocolLabel}`,
  };
}

async function addMessage(t: TestController) {
  // Assert that we are in create message view
  await t.expect(messagesCreatePage.title.exists).ok();

  // Fill in subject and body fields, then submit the form
  await t
    .click(messagesCreatePage.recipientSelectionInput)
    .click(screen.findByText(t.ctx.message.recipientSelection))
    .typeText(messagesCreatePage.subjectInput, t.ctx.message.subject)
    .typeText(messagesCreatePage.bodyTextInput, t.ctx.message.bodyText)
    .click(messagesCreatePage.submitCreateMessageForm);
}

const smsMessageMock = {
  id: 'TWVzc2FnZU5vZGU6MTE1',
  subject: 'Mocked subject',
  bodyText: 'Mocked bodyText',
  recipientSelection: 'ALL',
  recipientCount: 0,
  sentAt: '2024-07-10T08:23:12.943Z',
  protocol: 'SMS',
  event: null,
  translations: [
    {
      languageCode: 'EN',
      subject: '',
      bodyText: '',
      __typename: 'MessageTranslationType',
    },
    {
      languageCode: 'SV',
      subject: '',
      bodyText: '',
      __typename: 'MessageTranslationType',
    },
    {
      languageCode: 'FI',
      subject: 'Mocked subject',
      bodyText: 'Mocked bodyText',
      __typename: 'MessageTranslationType',
    },
  ],
  occurrences: {
    edges: [],
    __typename: 'OccurrenceNodeConnection',
  },
  __typename: 'MessageNode',
};

const sendSmsMock = RequestMock()
  .onRequestTo(async (request) => {
    return (
      request.url === BrowserTestJWTConfig.kukkuuApiGraphqlEndpoint &&
      request.method === 'post' &&
      request.isAjax &&
      JSON.parse(request.body.toString()).operationName === 'AddMessage'
    );
  })
  .respond(
    (req, res) => {
      const mockedResponseBody = {
        data: {
          addMessage: {
            message: {
              id: smsMessageMock.id,
              __typename: 'MessageNode',
            },
            __typename: 'AddMessageMutationPayload',
          },
        },
      };
      // eslint-disable-next-line no-console
      console.info(
        'Responding to a AddMessageMutation with a mocked response',
        {
          'response body': JSON.stringify(mockedResponseBody),
        }
      );
      res.setBody(mockedResponseBody);
    },
    200,
    { 'access-control-allow-origin': '*' }
  )
  .onRequestTo(async (request) => {
    try {
      const graphqlBody = JSON.parse(request.body.toString());
      // When messages are requested
      return (
        request.url === BrowserTestJWTConfig.kukkuuApiGraphqlEndpoint &&
        request.method === 'post' &&
        request.isAjax &&
        graphqlBody.operationName === 'Messages'
      );
    } catch (e) {
      return false;
    }
  })
  .respond(
    (req, res) => {
      const mockedResponseBody = {
        data: {
          messages: {
            edges: [
              {
                node: smsMessageMock,
                __typename: 'MessageNodeEdge',
              },
            ],
            __typename: 'MessageNodeConnection',
          },
        },
      };

      // eslint-disable-next-line no-console
      console.info(
        'Responding to MessagesQuery with a mocked list of messages',
        {
          'response body': JSON.stringify(mockedResponseBody),
        }
      );
      res.setBody(mockedResponseBody);
    },
    200,
    { 'access-control-allow-origin': '*' }
  )
  .onRequestTo(async (request) => {
    try {
      const graphqlBody = JSON.parse(request.body.toString());
      // When a single message is requested
      return (
        request.url === BrowserTestJWTConfig.kukkuuApiGraphqlEndpoint &&
        request.method === 'post' &&
        request.isAjax &&
        graphqlBody.operationName === 'Message'
      );
    } catch (e) {
      return false;
    }
  })
  .respond(
    (req, res) => {
      const mockedResponseBody = {
        data: {
          message: {
            ...smsMessageMock,
          },
        },
      };

      // eslint-disable-next-line no-console
      console.info('Responding to MessageQuery with a mocked message', {
        'response body': JSON.stringify(mockedResponseBody),
      });
      res.setBody(mockedResponseBody);
    },
    200,
    { 'access-control-allow-origin': '*' }
  );

fixture`Messages feature`
  .requestHooks([
    // Use AuthServiceRequestInterceptor to mock Keycloak out.
    new AuthServiceRequestInterceptor(browserTestAdminUser),
    // Use KukkuuApiTestJwtBearerAuthorization to add auth header to every API request.
    new KukkuuApiTestJwtBearerAuthorization(browserTestAdminUser),
  ])
  .beforeEach(async (t) => {
    // Use authorizedGuardian guardian role to populate session storage
    await t.useRole(authorizedAdmin).navigateTo(routes.messagesList());

    await t.click(navigation.messages);

    // Add a test message to context
    t.ctx.message = buildTestMessage();
    t.ctx.sms = buildTestMessage('sms');
  })
  .afterEach(async (t) => {
    // Clean test message from context
    delete t.ctx.message;
  });

test('As an admin I want to see a list of messages', async (t) => {
  if ((await messagesListPage.listBody.exists) === false) {
    // From message list view go into create message view
    await t.click(messagesListPage.createMessageLink);

    await addMessage(t);
  }
  // The list displays the expected fields
  await t
    .expect(messagesListPage.listHeader.filter(includesHeaders).exists)
    .ok();

  // The list has content
  await t.expect(messagesListPage.listBody.childElementCount).gt(0);
});

test('As an admin I want to create and delete messages', async (t) => {
  // From message list view go into create message view
  await t.click(messagesListPage.createMessageLink);

  await addMessage(t);

  // Assert that we have been redirected into the list view
  await t.expect(messagesListPage.title.exists).ok('', { timeout: 10000 });

  const messageSelector = within(messagesListPage.listBody)
    .queryByText(t.ctx.message.bodyText)
    .with({ timeout: 1000 });

  // Assert that the new message can be found
  await t.expect(messageSelector.exists).ok('', { timeout: 10000 });

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

  // Assert that the new message can no longer be found
  await t.expect(messageSelector.exists).notOk('', { timeout: 10000 });
});

test('As an admin I should be able to send SMS messages', async (t) => {
  if (preventSMSSending) {
    // eslint-disable-next-line no-console
    console.info('Preventing SMS sending with a mock.');
    await t.addRequestHooks(sendSmsMock);
  }
  await t.click(messagesListPage.createMessageSmsLink);

  // eslint-disable-next-line no-console
  console.debug('Submitting form and sending the message.');
  await t
    .click(messagesCreatePage.recipientSelectionInput)
    .click(screen.findByText(t.ctx.message.recipientSelection))
    .typeText(messagesCreatePage.bodyTextInput, t.ctx.sms.bodyText)
    .click(messagesCreatePage.submitAndSendMessage);

  // Assert that we have been redirected into the list view
  await t.expect(messagesListPage.title.exists).ok();

  // eslint-disable-next-line no-console
  console.debug('Query the message from the list of messages.');
  const smsSelector = within(messagesListPage.listBody)
    .queryByText(preventSMSSending ? 'Mocked bodyText' : t.ctx.sms.bodyText)
    .with({ timeout: 1000 });

  // Assert that the new message can be found
  await t.expect(smsSelector.exists).ok('', { timeout: 10000 });

  // eslint-disable-next-line no-console
  console.debug('Clicking the event to open the details...');
  // Open details page
  await t.click(smsSelector);

  // eslint-disable-next-line no-console
  console.debug('Opening the message details page.');
  // Assert that the SMS has been sent
  await t.expect(messagesShowPage.isSent.exists).ok('', { timeout: 10000 });
});
