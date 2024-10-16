import { gql } from '@apollo/client';

const MessageFragment = gql`
  fragment MessageFragment on MessageNode {
    id
    subject
    bodyText
    recipientSelection
    recipientCount
    sentAt
    protocol
    project {
      id
      year
    }
    event {
      id
      name
    }
    translations {
      languageCode
      subject
      bodyText
    }
    occurrences {
      edges {
        node {
          id
          time
        }
      }
    }
  }
`;

export const messagesQuery = gql`
  query Messages($projectId: ID, $limit: Int, $offset: Int, $orderBy: String) {
    messages(
      projectId: $projectId
      limit: $limit
      offset: $offset
      orderBy: $orderBy
    ) {
      count
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
