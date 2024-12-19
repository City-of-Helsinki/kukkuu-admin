import { useMutation } from 'react-query';
import { useDataProvider } from 'react-admin';

import type extendedDataProvider from '../../../api/dataProvider';

const useSetReadyMutation = () => {
  const dataProvider = useDataProvider<typeof extendedDataProvider>();
  return useMutation({
    mutationFn: async (
      params: Parameters<(typeof dataProvider)['setReady']>[1]
    ) =>
      await dataProvider.setReady('events', {
        ...params,
      }),
  });
};

export default useSetReadyMutation;
