import { gql } from '@apollo/client';

const EventGroupEventFragment = gql`
  fragment EventGroupEventFragment on EventNode {
    id
    name
    image
    participantsPerInvite
    duration
    capacityPerOccurrence
    publishedAt
    duration
    occurrences {
      edges {
        node {
          id
          enrolmentCount
        }
      }
    }
  }
`;

export const eventGroupQuery = gql`
  query EventGroup($id: ID!) {
    eventGroup(id: $id) {
      id
      name
      events {
        edges {
          node {
            ...EventGroupEventFragment
          }
        }
      }
    }
  }

  ${EventGroupEventFragment}
`;