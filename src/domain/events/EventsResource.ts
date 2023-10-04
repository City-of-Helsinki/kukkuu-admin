import EventShow from './detail/EventShow';
import EventCreate from './create/EventCreate';
import EventEdit from './edit/EventEdit';

const EventsResource = {
  Detail: EventShow,
  Create: EventCreate,
  Edit: EventEdit,
};

export default EventsResource;
