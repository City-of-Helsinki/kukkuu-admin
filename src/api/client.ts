import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URI,
  request: operation => {
    const token = localStorage.getItem('apiToken');
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    }
  },
});

export default client;
