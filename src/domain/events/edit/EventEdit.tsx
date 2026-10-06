import { useTranslate } from 'react-admin';
import { CardHeader, Grid } from '@mui/material';

import KukkuuEdit from '../../application/layout/kukkuuEditPage/KukkuuEdit';
import ViewTitle from '../../../common/components/viewTitle/ViewTitle';
import EventForm from '../eventForm/EventForm';
import { ProjectContextGuard } from '../../projects/components/ProjectContextGuard';

const EventEdit = () => {
  const translate = useTranslate();

  // Undoable / mutationMode is false to prevent image from appearing while waiting for backend result.
  return (
    <>
      <CardHeader title={translate('events.edit.title')} />
      <Grid container direction="column" item>
        <KukkuuEdit
          mutationMode={'pessimistic'}
          title={'events.edit.title'}
          redirect="show"
        >
          <ProjectContextGuard>
            <ViewTitle />
            <EventForm view="edit" />
          </ProjectContextGuard>
        </KukkuuEdit>
      </Grid>
    </>
  );
};

export default EventEdit;
