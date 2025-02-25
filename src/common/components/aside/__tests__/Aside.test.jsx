import React from 'react';
import { render, screen } from '@testing-library/react';

import Aside from '../Aside';
const title = 'Test Title';
describe('Aside component', () => {
  it('displays the correct title', () => {
    render(<Aside title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('renders content correctly', () => {
    const content = <div>Test Children</div>;
    render(<Aside content={content} />);
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });
});
