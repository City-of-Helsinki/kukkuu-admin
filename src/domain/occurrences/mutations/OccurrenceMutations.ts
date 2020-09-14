import gql from 'graphql-tag';

export const addOccurrenceMutation = gql`
  mutation addOccurrence($input: AddOccurrenceMutationInput!) {
    addOccurrence(input: $input) {
      occurrence {
        id
        time
        event {
          id
          capacityPerOccurrence
          duration
        }
        enrolmentCount
        venue {
          id
          translations {
            languageCode
            name
          }
        }
        capacity
        capacityOverride
      }
    }
  }
`;

export const updateOccurrenceMutation = gql`
  mutation updateOccurrence($input: UpdateOccurrenceMutationInput!) {
    updateOccurrence(input: $input) {
      occurrence {
        id
        time
        event {
          id
          capacityPerOccurrence
          duration
        }
        enrolmentCount
        venue {
          id
          translations {
            languageCode
            name
          }
        }
        capacity
        capacityOverride
        enrolments {
          edges {
            node {
              id
              attended
              child {
                firstName
                lastName
                birthdate
                guardians {
                  edges {
                    node {
                      id
                      email
                      firstName
                      lastName
                      language
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const deleteOccurrenceMutation = gql`
  mutation deleteOccurrence($input: DeleteOccurrenceMutationInput!) {
    deleteOccurrence(input: $input) {
      clientMutationId
    }
  }
`;

export const setEnrolmentAttendanceMutation = gql`
  mutation setEnrolmentAttendance(
    $input: SetEnrolmentAttendanceMutationInput!
  ) {
    setEnrolmentAttendance(input: $input) {
      enrolment {
        id
        attended
      }
    }
  }
`;
