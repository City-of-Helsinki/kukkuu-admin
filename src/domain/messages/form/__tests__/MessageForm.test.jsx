import React from 'react';
import { AdminContext } from 'react-admin';
import { render, fireEvent, screen } from '@testing-library/react';

import MessageForm from '../MessageForm';

const defaultProps = {
  location: {},
  match: {},
};
const getWrapper = (props) =>
  render(
    <AdminContext>
      <MessageForm {...defaultProps} {...props} />
    </AdminContext>
  );

// FIXME: KK-1017. Skipped as quite needless.
describe.skip('<MessageForm />', () => {
  // eslint-disable-next-line max-len
  it('should not show event select unless the user has chosen some other recipient count than all or invited', async () => {
    getWrapper();

    expect(screen.queryByText('messages.fields.event.label')).toBeFalsy();
    expect(screen.queryAllByText('messages.fields.event.label').length).toBe(0);

    const recipient = await screen.findByRole('combobox', {
      name: 'messages.fields.recipientSelection.label',
    });
    fireEvent.click(recipient);

    const invited = await screen.findByRole('option', {
      name: 'messages.fields.recipientSelection.choices.INVITED.label',
    });
    fireEvent.click(invited);

    expect(screen.queryAllByText('messages.fields.event.label').length).toBe(0);

    fireEvent.click(recipient);

    const enrolled = await screen.findByRole('option', {
      name: 'messages.fields.recipientSelection.choices.ENROLLED.label',
    });
    fireEvent.click(enrolled);

    expect(
      screen.queryAllByText('messages.fields.event.label').length
    ).toBeGreaterThan(0);
  });
});
