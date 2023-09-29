import React from 'react';
import { Link } from 'react-admin';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useLocation } from 'react-router';

export type Crumb = {
  label: string;
  link: string | null;
};

const useStyles = makeStyles((theme) => ({
  crumb: {
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.fontWeightBold,
  },
  wrapper: {
    '& .MuiBreadcrumbs-separator': {
      fontWeight: theme.typography.fontWeightBold,
    },
  },
}));

type CrumbsProps = {
  className: string;
  crumbs: Crumb[];
};

const BreadCrumbs = ({ className, crumbs }: CrumbsProps) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Breadcrumbs
      separator="<"
      className={[classes.wrapper, className].join(' ')}
    >
      {
        // The breadcrumbs component adds a separator between all
        // children. By having this empty component, we are tricking it
        // into adding a starting separator.
      }
      <span aria-hidden="true"></span>
      {crumbs.map(({ label, link }) => {
        const isActive = location.pathname === link;
        const key = label + link;

        if (isActive) {
          return (
            <Typography key={key} color="textPrimary" className={classes.crumb}>
              {label}
            </Typography>
          );
        }

        if (!link) {
          return null;
        }

        return (
          <Link key={key} color="inherit" to={link} className={classes.crumb}>
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
