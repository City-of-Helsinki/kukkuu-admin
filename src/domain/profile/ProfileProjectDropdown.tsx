import React, { MouseEvent } from 'react';
import { useQueryWithStore, useRefresh } from 'react-admin';
import { makeStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

// eslint-disable-next-line max-len
import { MyAdminProfile_myAdminProfile_projects_edges_node as ProjectNode } from '../../api/generatedTypes/MyAdminProfile';
import RelayList from '../../api/relayList';
import profileService from './profileService';

const ProjectList = RelayList<ProjectNode>();

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: 'none',
    fontSize: theme.typography.body1.fontSize,
  },
}));

const ProfileProjectDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const { loading, error, data } = useQueryWithStore({
    type: 'getMyAdminProfile',
    resource: 'profiles',
    payload: {},
  });
  const refresh = useRefresh();
  const classes = useStyles();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: any) => {
    const value = event.target.dataset.value;

    profileService.projectId = value as string;

    refresh();
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return null;
  }

  if (error) {
    return null;
  }

  const projects = ProjectList(data?.projects).items;

  if (!projects || projects.length === 0) {
    return null;
  }

  const selectedProject = projects.find(
    (project) => project.id === profileService.projectId
  ) as ProjectNode;

  if (!selectedProject) {
    return null;
  }

  if (projects.length === 1) {
    return (
      <>
        {selectedProject.year} {selectedProject.name}
      </>
    );
  }

  return (
    <>
      <Button
        aria-controls="project-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        className={classes.button}
      >
        {selectedProject.year} {selectedProject.name}
      </Button>
      <Menu
        id="project-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {projects.map((project) => (
          <MenuItem
            key={project.id}
            data-value={project.id}
            onClick={handleMenuItemClick}
          >
            {project.year} {project.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ProfileProjectDropdown;
