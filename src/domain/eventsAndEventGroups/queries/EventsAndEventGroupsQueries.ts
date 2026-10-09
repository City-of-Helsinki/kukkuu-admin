import { gql } from '@apollo/client';

const EventFragment = gql`
  fragment EventFragment on EventNode {
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
          capacityOverride
        }
      }
    }
    organisation {
      id
      name
    }
  }
`;

export const eventsAndEventGroupsQuery = gql`
  query EventsAndEventGroups($projectId: ID) {
    eventsAndEventGroups(projectId: $projectId) {
      edges {
        node {
          ... on EventNode {
            ...EventFragment
          }
          ... on EventGroupNode {
            id
            name
            publishedAt
            events {
              edges {
                node {
                  ...EventFragment
                }
              }
            }
          }
        }
      }
    }
  }

  ${EventFragment}
`;
