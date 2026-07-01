import type { Page } from '@playwright/test';

import BrowserTestJWTConfig from '../jwt/config';

// Static mock body returned for AddMessage / Messages / Message GraphQL
// operations while the SMS test runs. The real backend would only return
// a `MessageNode` populated like this after the SMS has actually been
// delivered — using this mock prevents real SMS sending in test runs.
export const smsMessageMock = {
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

/**
 * Intercept the Kukkuu GraphQL endpoint and stub the operations that the SMS
 * send flow exercises (AddMessage mutation, Messages list query, single
 * Message query). Anything else passes through to the live backend.
 *
 * Must be called before any user action that triggers the AddMessage
 * mutation, otherwise the mutation hits the real backend and the dev env
 * will actually send an SMS.
 */
export async function installSmsMessageMock(page: Page): Promise<void> {
  await page.route(
    BrowserTestJWTConfig.kukkuuApiGraphqlEndpoint,
    async (route, request) => {
      if (request.method() !== 'POST') {
        await route.continue();
        return;
      }

      let operationName: string | undefined;
      try {
        const body = JSON.parse(request.postData() ?? '{}');
        operationName = body.operationName;
      } catch {
        await route.continue();
        return;
      }

      switch (operationName) {
        case 'AddMessage':
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              data: {
                addMessage: {
                  message: {
                    id: smsMessageMock.id,
                    __typename: 'MessageNode',
                  },
                  __typename: 'AddMessageMutationPayload',
                },
              },
            }),
          });
          return;
        case 'Messages':
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
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
            }),
          });
          return;
        case 'Message':
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              data: { message: { ...smsMessageMock } },
            }),
          });
          return;
        default:
          await route.continue();
      }
    }
  );
}
