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
    readyForEventGroupPublishing
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
      publishedAt
      translations {
        languageCode
        name
        shortDescription
        description
      }
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
