import { useLogout, useTranslate } from 'react-admin';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import InfoPageTemplate from './InfoPageTemplate';
import authorizationService from './authorizationService';

const UnauthorizedPage = () => {
  const translate = useTranslate();
  const logout = useLogout();
  const unauthorizedReason = authorizationService.getUnauthorizedReason();
  const contactEmail = translate(
    'authentication.unauthorizedPage.contactEmail'
  );
  const syncLogout = () => {
    (async () => {
      await logout();
    })();
  };

  const isNoOrganisation = unauthorizedReason === 'no_organisation';
  const title = translate(
    isNoOrganisation
      ? 'authentication.unauthorizedPage.noOrganisationTitle'
      : 'authentication.unauthorizedPage.title'
  );
  const content = translate(
    isNoOrganisation
      ? 'authentication.unauthorizedPage.noOrganisationContent'
      : 'authentication.unauthorizedPage.content'
  );

  return (
    <InfoPageTemplate
      title={title}
      content={
        <>
          {content} <a href={'mailto:' + contactEmail}>{contactEmail}</a>
          <Box style={{ marginTop: '2rem' }}>
            <Button variant="contained" color="secondary" onClick={syncLogout}>
              {translate('ra.auth.logout')}
            </Button>
          </Box>
        </>
      }
    />
  );
};
export default UnauthorizedPage;
