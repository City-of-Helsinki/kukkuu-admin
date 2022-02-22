import * as Sentry from '@sentry/browser';

import Config from '../../../domain/config';
import handleError from '../handleApolloError';

const graphQLError = {
  message: 'Message',
  extensions: {
    code: 'TEST',
  },
  locations: [],
  path: ['myTest'],
};

const operation = {
  operationName: 'Test',
  query: {
    definitions: [
      {
        kind: 'OperationDefinition',
        operation: 'query',
      },
    ],
  },
};

describe('client', () => {
  describe('handleApolloError', () => {
    const mockScope = {
      setLevel: jest.fn(),
      setTag: jest.fn(),
      setContext: jest.fn(),
      setExtra: jest.fn(),
    };

    beforeAll(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {
        // pass
      });
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    describe('GraphQL errors', () => {
      it('should send graphQL errors', () => {
        const captureExceptionSpy = jest.spyOn(Sentry, 'captureException');
        const captureMessageSpy = jest.spyOn(Sentry, 'captureMessage');
        const withScopeSpy = jest.spyOn(Sentry, 'withScope');

        withScopeSpy.mockImplementation((cb) => cb(mockScope));

        handleError({ graphQLErrors: [graphQLError], operation });

        expect(withScopeSpy).toHaveBeenCalledTimes(1);
        expect(mockScope.setLevel).toHaveBeenCalledWith('error');
        expect(mockScope.setTag).toHaveBeenCalledWith('type', 'GraphQL Error');
        expect(mockScope.setTag).toHaveBeenCalledWith(
          'operation.kind',
          'query'
        );
        expect(mockScope.setContext).toHaveBeenCalledWith(
          'GraphQL Error',
          expect.any(Object)
        );
        expect(mockScope.setContext).toHaveBeenCalledWith(
          'Operation',
          expect.any(Object)
        );
        expect(captureExceptionSpy).toHaveBeenCalledTimes(0);
        expect(captureMessageSpy).toHaveBeenCalledWith(graphQLError.message);
      });

      it('should ignore JWT expiration and PERMISSION_DENIED errors', () => {
        const captureExceptionSpy = jest.spyOn(Sentry, 'captureException');
        const captureMessageSpy = jest.spyOn(Sentry, 'captureMessage');
        const graphQLErrors = [
          {
            message: 'Invalid Authorization header. JWT has expired.',
            extensions: {},
          },
          {
            message: 'foobar',
            extensions: {
              code: 'AUTHENTICATION_EXPIRED_ERROR',
            },
          },
          {
            message: '123',
            extensions: {
              code: 'PERMISSION_DENIED_ERROR',
            },
          },
        ];

        handleError({ graphQLErrors: graphQLErrors, operation });

        expect(captureExceptionSpy).toHaveBeenCalledTimes(0);
        expect(captureMessageSpy).toHaveBeenCalledTimes(0);
      });

      it('should send all errors in development mode', () => {
        jest.spyOn(Config, 'NODE_ENV', 'get').mockReturnValue('development');

        const graphQLErrors = [
          {
            message: 'Invalid Authorization header. JWT has expired.',
            extensions: {},
          },
          {
            message: 'Permission denied',
            extensions: {
              code: 'PERMISSION_DENIED_ERROR',
            },
          },
          {
            message: 'Any error',
          },
        ];

        const consoleErrorSpy = jest
          .spyOn(console, 'error')
          .mockImplementation(() => {
            // pass
          });

        handleError({ graphQLErrors: graphQLErrors, operation });

        graphQLErrors
          .map(
            (graphQLError) =>
              // eslint-disable-next-line max-len
              `[GraphQL error]: Message: ${graphQLError.message}, Code: ${graphQLError.extensions?.code}, Location: ${graphQLError.locations}, Path: ${graphQLError.path}`
          )
          .forEach((errorMessage) => {
            expect(consoleErrorSpy).toHaveBeenCalledWith(errorMessage);
          });
      });

      it('should capture original error if it exists', () => {
        const captureExceptionSpy = jest.spyOn(Sentry, 'captureException');
        const captureMessageSpy = jest.spyOn(Sentry, 'captureMessage');

        jest
          .spyOn(Sentry, 'withScope')
          .mockImplementation((cb) => cb(mockScope));

        const graphQLErrors = [
          {
            originalError: new Error('Error test'),
            message: 'Error test',
            extensions: {},
          },
        ];

        handleError({ graphQLErrors: graphQLErrors, operation });

        expect(captureExceptionSpy).toHaveBeenCalledTimes(1);
        expect(captureMessageSpy).toHaveBeenCalledTimes(0);
      });
    });

    describe('network errors', () => {
      it('should not send network errors', () => {
        const error = Error('Test');
        const captureExceptionSpy = jest.spyOn(Sentry, 'captureException');
        const captureMessageSpy = jest.spyOn(Sentry, 'captureMessage');

        handleError({ networkError: error, operation });

        expect(captureExceptionSpy).toHaveBeenCalledTimes(0);
        expect(captureMessageSpy).toHaveBeenCalledTimes(0);
      });
    });
  });
});
