import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import { ThemeProvider, makeStyles } from '@material-ui/styles';

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
