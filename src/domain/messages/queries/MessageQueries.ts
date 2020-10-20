import gql from 'graphql-tag';

export const MessagesQuery = gql`
  query Messages($projectId: ID) {
    messages(projectId: $projectId) {
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
