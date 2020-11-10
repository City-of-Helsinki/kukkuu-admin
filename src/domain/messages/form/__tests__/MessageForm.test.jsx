import React from 'react';
import { TestContext } from 'react-admin';
import {
  render,
  getByText,
  queryByText,
  fireEvent,
  getByRole,
  screen,
} from '@testing-library/react';

import MessageForm from '../MessageForm';

const defaultProps = {
  location: {},
  match: {},
};
const getWrapper = (props) =>
  render(
    <TestContext>
      <MessageForm {...defaultProps} {...props} />
    </TestContext>
  );

const getSelectInputByLabelText = (container, labelText) => {
  const labelSpan = getByText(container, labelText, {
    selector: 'label > *',
  });
  const label = labelSpan.parentElement;
  const labelParent = label.parentElement;

  return labelParent.querySelector('input');
};

const querySelectInputByLabelText = (container, labelText) => {
  const labelSpan = queryByText(container, labelText, {
    selector: 'label > *',
  });

  if (!labelSpan) {
    return null;
  }

  return labelSpan.parentElement.parentElement.querySelector('input');
};

const chooseSelectInputOption = async (container, selectInput, optionLabel) => {
  fireEvent.mouseDown(getByRole(selectInput.parentElement, 'button'));

  const option = await screen.getByRole('option', { name: optionLabel });

  fireEvent.click(option);
};

describe('<MessageForm />', () => {
  it('should not show event select unless the user has chosen some other recipient count than all', async () => {
    const { container, queryAllByText } = getWrapper();

    expect(
      querySelectInputByLabelText(container, 'messages.fields.event.label')
    ).toBeFalsy();

    await chooseSelectInputOption(
      container,
      getSelectInputByLabelText(
        container,
        'messages.fields.recipientSelection.label'
      ),
      'messages.fields.recipientSelection.choices.INVITED.label'
    );

    expect(
      queryAllByText('messages.fields.event.label').length
    ).toBeGreaterThan(0);
  });
});
