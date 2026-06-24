import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { toShortDateTimeString } from '../../common/utils';

type Props = {
  eventName: string;
  venueName: string;
  occurrenceTime: string;
};

const OccurrenceCard = ({ eventName, venueName, occurrenceTime }: Props) => {
  return (
    <Card>
      <CardContent sx={{ '&:last-child': { paddingBottom: 16 } }}>
        <Typography sx={{ fontSize: 14 }} color="textSecondary">
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
