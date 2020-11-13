import React from 'react';
import { Link } from 'react-admin';
import { makeStyles, Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
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
}));

type CrumbsProps = {
  className: string;
  crumbs: Crumb[];
};

const BreadCrumbs = ({ className, crumbs }: CrumbsProps) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Breadcrumbs separator="‹" className={className}>
      {crumbs.map(({ label, link }, i) => {
        const isActive = location.pathname === link;
        const isFirst = i === 0;
        const key = label + link;
        const decoratedLabel = `${isFirst ? '< ' : ''}${label}`;

        if (isActive) {
          return (
            <Typography key={key} color="textPrimary" className={classes.crumb}>
              {decoratedLabel}
            </Typography>
          );
        }

        if (!link) {
          return null;
        }

        return (
          <Link key={key} color="inherit" to={link} className={classes.crumb}>
            {decoratedLabel}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
