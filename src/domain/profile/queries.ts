import { gql } from '@apollo/client';

export const myAdminProfileQuery = gql`
  query MyAdminProfile {
    myAdminProfile {
      id
      isEventOrganiser
      isSystemAdministrator
      organisations {
        edges {
          node {
            id
            name
          }
        }
      }
      projects {
        edges {
          node {
            id
            year
            name
            myPermissions {
              publish
              manageEventGroups
              canSendToAllInProject
              viewFamilies
            }
          }
        }
      }
    }
  }
`;
