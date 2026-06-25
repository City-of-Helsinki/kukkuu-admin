import { Toolbar, SaveButton, DeleteWithConfirmButton } from 'react-admin';

const EventGroupEditToolbar = () => (
  <Toolbar style={{ justifyContent: 'space-between' }}>
    <SaveButton />
    <DeleteWithConfirmButton redirect={() => '/events-and-event-groups'} />
  </Toolbar>
);

export default EventGroupEditToolbar;
