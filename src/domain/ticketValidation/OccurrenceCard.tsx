import React from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { toShortDateTimeString } from '../../common/utils';

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  container: {
    '&:last-child': {
      paddingBottom: 16,
    },
  },
});

type Props = {
  eventName: string;
  venueName: string;
  occurrenceTime: string;
};

const OccurrenceCard = ({ eventName, venueName, occurrenceTime }: Props) => {
  const classes = useStyles();

  return (
    <Card>
      <CardContent className={classes.container}>
        <Typography className={classes.title} color="textSecondary">
          {toShortDateTimeString(new Date(occurrenceTime))}
        </Typography>
        <Typography variant="h5" component="h2">
          {eventName}
        </Typography>
        <Typography color="textSecondary">{venueName}</Typography>
      </CardContent>
    </Card>
  );
};

export default OccurrenceCard;
