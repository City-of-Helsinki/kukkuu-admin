import Typography from '@mui/material/Typography';
import { useRecordContext } from 'react-admin';
import type { FieldProps } from 'react-admin';

import type { OccurrenceNode } from '../../api/generatedTypes/graphql';

const OccurrenceLanguagesField = (
  props: FieldProps<Pick<OccurrenceNode, 'languages'>>
) => {
  const record = useRecordContext(props);

  return (
    <Typography variant="body2" component="span">
      {record?.languages.map(({ name }) => name).join(', ')}
    </Typography>
  );
};

export default OccurrenceLanguagesField;
