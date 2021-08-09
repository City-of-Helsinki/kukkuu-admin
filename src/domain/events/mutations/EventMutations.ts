import { gql } from '@apollo/client';

export const addEventMutation = gql`
  mutation AddEvent($input: AddEventMutationInput!) {
    addEvent(input: $input) {
      event {
        id
        image
        participantsPerInvite
        capacityPerOccurrence
        duration
        ticketSystem {
          type
        }
        translations {
          languageCode
          name
          imageAltText
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
        image
        participantsPerInvite
        capacityPerOccurrence
        duration
        readyForEventGroupPublishing
        translations {
          imageAltText
          languageCode
          name
          description
          shortDescription
        }
        occurrences {
          edges {
            node {
              id
            }
          }
        }
        ticketSystem {
          type
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

export const deleteEventMutation = gql`
  mutation deleteEvent($input: DeleteEventMutationInput!) {
    deleteEvent(input: $input) {
      clientMutationId
    }
  }
`;
