import type { MouseEvent } from 'react';
import React from 'react';
import { useDataProvider, useRefresh } from 'react-admin';
import { useQuery } from 'react-query';
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// eslint-disable-next-line max-len
import RelayList from '../../api/relayList';
import projectService from '../projects/projectService';
import type extendedDataProvider from '../../api/dataProvider';
import type {
  ProjectNode,
  ProjectNodeConnection,
} from '../api/generatedTypes/graphql';

const ProjectList = RelayList<ProjectNode>();

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: 'none',
    fontSize: theme.typography.body1.fontSize,
  },
}));

const ProfileProjectDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const dataProvider = useDataProvider<typeof extendedDataProvider>();
  const { isLoading, error, data } = useQuery({
    queryFn: dataProvider.getMyAdminProfile,
  });
  const refresh = useRefresh();
  const classes = useStyles();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: any) => {
    const value = event.target.dataset.value;

    projectService.projectId = value as string;

    // eslint-disable-next-line no-console
    console.info('Set the selected project to', value);

    refresh();
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isLoading) {
    return null;
  }

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }

  const projects = ProjectList(
    data?.data?.projects as ProjectNodeConnection
  ).items;

  if (!projects || projects.length === 0) {
    return null;
  }

  const selectedProject = projects.find(
    (project) => project.id === projectService.projectId
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
        color="inherit"
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
