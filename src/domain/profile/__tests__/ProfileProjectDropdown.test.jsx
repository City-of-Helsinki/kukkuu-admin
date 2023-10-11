import React from 'react';
import * as ReactAdmin from 'react-admin';
import * as ReactQuery from 'react-query';
import { screen, render, fireEvent } from '@testing-library/react';

import projectService from '../../projects/projectService';
import ProfileProjectDropdown from '../ProfileProjectDropdown';

const getWrapper = () =>
  render(
    <ReactAdmin.AdminContext>
      <ProfileProjectDropdown />
    </ReactAdmin.AdminContext>
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
  data: {
    projects: {
      edges: projects.map((project) => ({
        node: project,
      })),
    },
  },
});

describe('<ProfileProjectDropdown />', () => {
  beforeEach(() => {
    jest.spyOn(projectService, 'projectId', 'get').mockReturnValue('1');
  });

  it('should render null when loading', () => {
    jest.spyOn(ReactQuery, 'useQuery').mockReturnValueOnce({ isLoading: true });

    const { container } = getWrapper();

    expect(container.childNodes.length).toEqual(0);
  });

  it('should render null when error', () => {
    jest
      .spyOn(ReactQuery, 'useQuery')
      .mockReturnValueOnce({ isLoading: false, error: new Error('Test') });

    const { container } = getWrapper();

    expect(container.childNodes.length).toEqual(0);
  });

  it('should render null when missing data', () => {
    jest
      .spyOn(ReactQuery, 'useQuery')
      .mockReturnValue({ isLoading: false, data: {} });

    const { container } = getWrapper();

    expect(container.childNodes.length).toEqual(0);
  });

  it('should render null when there is not selected project', () => {
    jest.spyOn(projectService, 'projectId', 'get').mockReturnValue(null);
    jest
      .spyOn(ReactQuery, 'useQuery')
      .mockReturnValue({ isLoading: false, data: getProjects(projects) });

    const { container } = getWrapper();

    expect(container.childNodes.length).toEqual(0);
  });

  it('should render text when there is one project', async () => {
    jest.spyOn(ReactQuery, 'useQuery').mockReturnValue({
      isLoading: false,
      data: getProjects([projects[0]]),
    });

    getWrapper();

    expect(await screen.findByText('2020 Test')).toBeInTheDocument();
  });

  it('should allow the selected project to be changed when there is more than one project', async () => {
    jest.spyOn(ReactQuery, 'useQuery').mockReturnValue({
      isLoading: false,
      data: getProjects(projects),
    });
    const projectServiceSpy = jest.spyOn(projectService, 'projectId', 'set');
    const mockRefresh = jest.fn();
    jest.spyOn(ReactAdmin, 'useRefresh').mockReturnValue(mockRefresh);

    getWrapper();
    const button = await screen.findByRole('button', { name: '2020 Test' });

    // Expect to see menu toggle button
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    const menuItems = screen.getAllByRole('menuitem');

    // After clicking menu toggle expect to see menu items
    expect(menuItems.length).toEqual(2);

    fireEvent.click(menuItems[1]);

    // After selecting an item
    // Expect projectId to be set
    expect(projectServiceSpy).toHaveBeenCalledTimes(1);
    // Expect refresh to have been called
    expect(mockRefresh).toHaveBeenCalledTimes(1);
    // Expect for menu items to be hidden
    expect(screen.queryAllByRole('menuitem').length).toEqual(0);
  });
});
