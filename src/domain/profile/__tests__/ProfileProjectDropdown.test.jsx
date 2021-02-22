import React from 'react';
import { TestContext } from 'react-admin';
import { render, fireEvent } from '@testing-library/react';
import * as DataProvider from 'ra-core/lib/dataProvider';
import * as SideEffect from 'ra-core/lib/sideEffect';

import projectService from '../../projects/projectService';
import ProfileProjectDropdown from '../ProfileProjectDropdown';

const getWrapper = () =>
  render(
    <TestContext>
      <ProfileProjectDropdown />
    </TestContext>
  );

const projects = [
  {
    id: '1',
    year: 2020,
    name: 'Test',
  },
  {
    id: '2',
    year: 2021,
    name: 'Test 2',
  },
];

const getProjects = (projects) => ({
  projects: {
    edges: projects.map((project) => ({
      node: project,
    })),
  },
});

describe('<ProfileProjectDropdown />', () => {
  beforeEach(() => {
    jest.spyOn(projectService, 'projectId', 'get').mockReturnValue('1');
  });

  it('should render null when loading', () => {
    jest
      .spyOn(DataProvider, 'useQueryWithStore')
      .mockReturnValueOnce({ loading: true });

    const { container } = getWrapper();

    expect(container.childNodes.length).toEqual(0);
  });

  it('should render null when error', () => {
    jest
      .spyOn(DataProvider, 'useQueryWithStore')
      .mockReturnValueOnce({ loading: false, error: new Error('Test') });

    const { container } = getWrapper();

    expect(container.childNodes.length).toEqual(0);
  });

  it('should render null when missing data', () => {
    jest
      .spyOn(DataProvider, 'useQueryWithStore')
      .mockReturnValue({ loading: false, data: {} });

    const { container } = getWrapper();

    expect(container.childNodes.length).toEqual(0);
  });

  it('should render null when there is not selected project', () => {
    jest.spyOn(projectService, 'projectId', 'get').mockReturnValue(null);
    jest
      .spyOn(DataProvider, 'useQueryWithStore')
      .mockReturnValue({ loading: false, data: getProjects(projects) });

    const { container } = getWrapper();

    expect(container.childNodes.length).toEqual(0);
  });

  it('should render text when there is one project', () => {
    jest.spyOn(DataProvider, 'useQueryWithStore').mockReturnValue({
      loading: false,
      data: getProjects([projects[0]]),
    });

    const { getByText } = getWrapper();

    expect(getByText('2020 Test')).toBeInTheDocument();
  });

  it('should allow the selected project to be changed when there is more than one project', () => {
    jest.spyOn(DataProvider, 'useQueryWithStore').mockReturnValue({
      loading: false,
      data: getProjects(projects),
    });
    const projectServiceSpy = jest.spyOn(projectService, 'projectId', 'set');
    const mockRefresh = jest.fn();
    const refreshSpy = jest
      .spyOn(SideEffect, 'useRefresh')
      .mockReturnValue(mockRefresh);

    const { getByRole, getAllByRole, queryAllByRole } = getWrapper();
    const button = getByRole('button', { name: '2020 Test' });

    // Expect to see menu toggle button
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    const menuItems = getAllByRole('menuitem');

    // After clicking menu toggle expect to see menu items
    expect(menuItems.length).toEqual(2);

    fireEvent.click(menuItems[1]);

    // After selecting an item
    // Expect projectId to be set
    expect(projectServiceSpy).toHaveBeenCalledTimes(1);
    // Expect refresh to have been called
    expect(mockRefresh).toHaveBeenCalledTimes(1);
    // Expect for menu items to be hidden
    expect(queryAllByRole('menuitem').length).toEqual(0);
  });
});
