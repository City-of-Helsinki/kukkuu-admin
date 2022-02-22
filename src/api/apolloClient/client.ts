/* eslint-disable no-console */
import { ApolloClient, ApolloLink } from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';

import i18nProvider from '../../common/translation/i18nProvider';
import handleApolloError from './handleApolloError';

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_API_URI,
  headers: {
    'keep-alive': 'true',
  },
});

const errorLink = onError(handleApolloError);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('apiToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
      'accept-language': i18nProvider.getLocale() || 'fi',
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, uploadLink]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
    },
  },
  cache: new InMemoryCache(),
});

export default client;
