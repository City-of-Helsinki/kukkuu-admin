import { useTranslate, Loading } from 'react-admin';
import { useLocation } from 'react-router-dom';

import KukkuuCreatePage from '../../application/layout/kukkuuCreatePage/KukkuuCreatePage';
import KukkuuCreateToolbar from '../../application/layout/kukkuuCreatePage/KukkuuCreateToolbar';
import EventGroupForm from '../form/EventGroupForm';
import { useCopySource } from '../../events/copy/useCopySource';

/**
 * A custom hook that prepares the state and props for the KukkuuCreatePage
 * when creating or copying an EventGroup.
 *
 * It parses the query parameters to determine if the user is copying an
 * existing event group. If a copy operation is detected, it fetches the source
 * event group, strips out fields that should not be duplicated (e.g., id,
 * publishedAt, events), and sets up a payload transformation so the backend
 * can link the new copy to its source. Finally, it provides the appropriate
 * redirect behavior so the user is returned to the source event group
 * after a successful copy.
 */
const useEventGroupCreateProps = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const copyFrom = searchParams.get('copyFrom');

  const { record, isLoading } = useCopySource('event-groups', copyFrom);

  const isCopy = Boolean(copyFrom);
  const transform = isCopy
    ? (data: any) => ({ ...data, sourceEventGroupId: copyFrom })
    : undefined;
  const redirect = isCopy ? () => `/event-groups/${copyFrom}/show` : 'show';

  // Prepopulate record from copySource, stripping fields that shouldn't be copied
  const defaultRecord = record
    ? {
        ...record,
        id: undefined,
        publishedAt: undefined,
        events: undefined,
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

const EventGroupsCreate = () => {
  const t = useTranslate();
  const { isCopy, isLoading, transform, redirect, defaultRecord } =
    useEventGroupCreateProps();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <KukkuuCreatePage
      pageTitle={t('eventGroups.create.title.label')}
      reactAdminProps={{ redirect, transform, record: defaultRecord }}
    >
      <EventGroupForm toolbar={<KukkuuCreateToolbar />} isCopy={isCopy} />
    </KukkuuCreatePage>
  );
};

export default EventGroupsCreate;
