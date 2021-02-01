import React from 'react';
import { render, screen } from '@testing-library/react';

import Config from '../../../../domain/config';
import AppTitle from '../AppTitle';

const getWrapper = (props) => render(<AppTitle {...props} />);

describe('<AppTitle />', () => {
  it('should show a test label when it is used in a test environment', () => {
    jest.spyOn(Config, 'IS_TEST_ENVIRONMENT', 'get').mockReturnThis(true);

    getWrapper();

    expect(screen.getByText(/application.test/)).toBeInTheDocument();
  });
});
