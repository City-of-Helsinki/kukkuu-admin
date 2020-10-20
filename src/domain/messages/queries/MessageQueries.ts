import gql from 'graphql-tag';

export const MessagesQuery = gql`
  query Messages {
    messages {
      edges {
        node {
          id
          subject
          bodyText
          recipientSelection
          recipientCount
          sentAt
          event {
            name
          }
        }
      }
    }
  }
`;
