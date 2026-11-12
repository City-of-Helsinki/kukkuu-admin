import { render, screen } from '@testing-library/react';
import { AdminContext, RecordContextProvider } from 'react-admin';

import i18nProvider from '../../../../common/translation/i18nProvider';
import OccurrenceHasAccessibilitiesField from '../OccurrenceHasAccessibilitiesField';

const renderField = (record) =>
  render(
    <AdminContext i18nProvider={i18nProvider}>
      <RecordContextProvider value={record}>
        <OccurrenceHasAccessibilitiesField source="accessibilities" />
      </RecordContextProvider>
    </AdminContext>
  );

describe('OccurrenceHasAccessibilitiesField', () => {
  it('renders the yes text when the occurrence has accessibilities', () => {
    renderField({
      id: '1',
      accessibilities: [{ id: 'a-1', name: 'Näkemisen tuki' }],
    });

    expect(screen.getByText('Kyllä')).toBeInTheDocument();
  });

  it('renders the no text when the occurrence has no accessibilities', () => {
    renderField({ id: '1', accessibilities: [] });

    expect(screen.getByText('Ei')).toBeInTheDocument();
  });

  it('renders the no text when the accessibilities are missing', () => {
    renderField({ id: '1' });

    expect(screen.getByText('Ei')).toBeInTheDocument();
  });
});
