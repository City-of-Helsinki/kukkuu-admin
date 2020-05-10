import { gql } from 'apollo-boost';

export const addEventMutation = gql`
  mutation AddEvent($input: AddEventMutationInput!) {
    addEvent(input: $input) {
      event {
        id
        participantsPerInvite
        capacityPerOccurrence
        duration
        translations {
          languageCode
          name
          description
          shortDescription
        }
      }
    }
  }
`;

export const updateEventMutation = gql`
  mutation UpdateEvent($input: UpdateEventMutationInput!) {
    updateEvent(input: $input) {
      event {
        id
        participantsPerInvite
        capacityPerOccurrence
        duration
        translations {
          languageCode
          name
          description
          shortDescription
        }
      }
    }
  }
`;

export const publishEventMutation = gql`
  mutation PublishEvent($input: PublishEventMutationInput!) {
    publishEvent(input: $input) {
      event {
        id
        participantsPerInvite
        capacityPerOccurrence
        duration
        publishedAt
        translations {
          languageCode
          name
          description
          shortDescription
        }
      }
    }
  }
`;
