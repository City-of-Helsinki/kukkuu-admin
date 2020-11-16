import React from 'react';
import { render } from '@testing-library/react';
import { TestContext } from 'react-admin';

import Breadcrumbs from '../Breadcrumbs';

const crumbs = [
  {
    label: 'label1',
    link: '/link1',
  },
  {
    label: 'label2',
    link: '/link2',
  },
];
const defaultProps = {
  crumbs,
};
const getWrapper = (props) =>
  render(
    <TestContext>
      <Breadcrumbs {...defaultProps} {...props} />
    </TestContext>
  );

describe('Breadcrumbs', () => {
  it('as a user I want to see a list of breadcrumbs to know where I am', () => {
    const { queryByRole } = getWrapper();

    crumbs.forEach((crumb, i) => {
      const isFirst = i === 0;
      const name = (isFirst ? '< ' : '') + crumb.label;
      const link = queryByRole('link', {
        name,
      });

      expect(link).toBeTruthy();
    });
  });

  // eslint-disable-next-line max-len
  it('as a user I do not want to see a link when a crumb targets the current location because that is confusing', () => {
    const crumb = {
      label: 'link',
      link: '/',
    };
    const crumbText = '< ' + crumb.label;
    const { queryByRole, queryByText } = getWrapper({
      crumbs: [crumb],
    });

    expect(queryByText(crumbText)).toBeTruthy();
    expect(queryByRole('link', { name: crumbText })).toBeFalsy();
  });
});