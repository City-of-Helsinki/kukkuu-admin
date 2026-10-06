import { useTranslate, Loading } from 'react-admin';
import { useLocation } from 'react-router-dom';

import Aside from '../../../common/components/aside/Aside';
import KukkuuCreatePage from '../../application/layout/kukkuuCreatePage/KukkuuCreatePage';
import EventForm from '../eventForm/EventForm';
import { useCopySource } from '../copy/useCopySource';

/**
 * A custom hook that prepares the state and props for the KukkuuCreatePage
 * when creating a new Event or copying an existing one.
 *
 * It parses the query parameters to determine the context of the creation. If
 * the user is copying an event, it fetches the source event, strips out fields
 * that should not be duplicated (e.g., id, publishedAt, occurrences), and
 * establishes a payload transformation to link the new event to its source.
 * It also handles the appropriate redirection logic upon successful creation,
 * returning the user to the source event or the parent event group.
 */
const useEventCreateProps = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const eventGroupId = searchParams.get('eventGroupId');
  const copyFrom = searchParams.get('copyFrom');

  const { record, isLoading } = useCopySource('events', copyFrom);

  const isAddingEventToEventGroup = Boolean(eventGroupId);
  const isCopy = Boolean(copyFrom);

  const transform = (data: any) => {
    return {
      ...data,
      eventGroupId: isCopy
        ? data.eventGroupId || undefined
        : eventGroupId || undefined,
      sourceEventId: copyFrom || undefined,
    };
  };

  const redirect = isCopy
    ? () => `/events/${copyFrom}/show`
    : isAddingEventToEventGroup
      ? () => `/event-groups/${eventGroupId}/show`
      : 'show';

  // Prepopulate record from copySource, stripping fields that shouldn't be copied
  const defaultRecord = record
    ? {
        ...record,
        id: undefined,
        publishedAt: undefined,
        occurrences: undefined,
        readyForEventGroupPublishing: false,
        eventGroupId: record.eventGroup?.id || null,
      }
    : undefined;

  return {
    isCopy,
    isLoading: isCopy && isLoading,
    transform,
    redirect,
    defaultRecord,
  };
};

const EventCreate = () => {
  const translate = useTranslate();
  const { isCopy, isLoading, transform, redirect, defaultRecord } =
    useEventCreateProps();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <KukkuuCreatePage
      pageTitle={translate('events.create.title')}
      reactAdminProps={{
        aside: <Aside content="events.create.aside.content" />,
        transform,
        redirect,
        record: defaultRecord,
      }}
    >
      <EventForm view="create" isCopy={isCopy} />
    </KukkuuCreatePage>
  );
};

export default EventCreate;
