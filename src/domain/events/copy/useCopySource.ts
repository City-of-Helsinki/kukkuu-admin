import { useGetOne } from 'react-admin';

/**
 * Fetches the source entity (Event or EventGroup) that is being copied.
 * This hook is used in the creation forms to retrieve the data of the
 * existing entity when `?copyFrom=ID` is present in the URL, allowing
 * the form to be prepopulated with its values.
 *
 * @param resource The type of entity being copied ('events' or 'event-groups').
 * @param id The ID of the source entity to copy from.
 * @returns The fetched record, loading state, and any potential error.
 */
export const useCopySource = (
  resource: 'events' | 'event-groups',
  id?: string | null
) => {
  const { data, isLoading, error } = useGetOne(
    resource,
    { id: id as string },
    { enabled: !!id }
  );
  return { record: data, isLoading, error };
};
