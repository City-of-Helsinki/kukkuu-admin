import gql from 'graphql-tag';

const MessageFragment = gql`
  fragment MessageFragment on MessageNode {
    id
    subject
    bodyText
    recipientSelection
    recipientCount
    sentAt
    event {
      id
      name
    }
    translations {
      languageCode
      subject
      bodyText
    }
  }
`;

export const messagesQuery = gql`
  query Messages($projectId: ID) {
    messages(projectId: $projectId) {
      edges {
        node {
          ...MessageFragment
        }
      }
    }
  }

  ${MessageFragment}
`;

export const messageQuery = gql`
  query Message($id: ID!) {
    message(id: $id) {
      ...MessageFragment
    }
  }

  ${MessageFragment}
`;
