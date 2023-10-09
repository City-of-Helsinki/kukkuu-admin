import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import { ThemeProvider, Theme, StyledEngineProvider, makeStyles } from '@mui/styles';

import theme from '../../common/materialUI/themeConfig';

const useStyles = makeStyles(() => ({
  background: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    background:
      'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)',
  },
  container: {
    marginTop: '6em',
  },
}));

type Props = {
  title: string;
  content: React.ReactNode;
};

const InfoPageTemplate = ({ title, content }: Props) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.background}>
        <Container maxWidth="sm" className={classes.container}>
          <Card style={{ textAlign: 'center' }}>
            <CardHeader title={title} />
            <CardContent>{content}</CardContent>
          </Card>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default InfoPageTemplate;
