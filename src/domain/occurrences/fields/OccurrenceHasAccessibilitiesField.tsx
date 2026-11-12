import Typography from '@mui/material/Typography';
import { useFieldValue, useTranslate } from 'react-admin';
import type { FieldProps } from 'react-admin';

import type { OccurrenceNode } from '../../api/generatedTypes/graphql';

const OccurrenceHasAccessibilitiesField = (
  props: FieldProps<Pick<OccurrenceNode, 'accessibilities'>>
) => {
  const accessibilities = useFieldValue(props);
  const translate = useTranslate();

  return (
    <Typography variant="body2" component="span">
      {translate(
        accessibilities?.length ? 'ra.boolean.true' : 'ra.boolean.false'
      )}
    </Typography>
  );
};

export default OccurrenceHasAccessibilitiesField;
