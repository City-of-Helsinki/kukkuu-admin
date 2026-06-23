import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';

import theme from '../../common/materialUI/themeConfig';

type Props = {
  title: string;
  content: React.ReactNode;
};

const InfoPageTemplate = ({ title, content }: Props) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div
          style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            background:
              'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)',
          }}
        >
          <Container maxWidth="sm" sx={{ marginTop: '6em' }}>
            <Card style={{ textAlign: 'center' }}>
              <CardHeader title={title} />
              <CardContent>{content}</CardContent>
            </Card>
          </Container>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default InfoPageTemplate;
