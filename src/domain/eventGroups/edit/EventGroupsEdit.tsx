import KukkuuEditPage from '../../application/layout/kukkuuEditPage/KukkuuEditPage';
import EventGroupForm from '../form/EventGroupForm';
import EventGroupEditToolbar from './EventGroupEditToolbar';

const EventGroupsEdit = () => {
  return (
    <KukkuuEditPage
      pageTitleSource="name"
      reactAdminProps={{ redirect: () => '/events-and-event-groups' }}
    >
      <EventGroupForm toolbar={<EventGroupEditToolbar />} />
    </KukkuuEditPage>
  );
};

export default EventGroupsEdit;
