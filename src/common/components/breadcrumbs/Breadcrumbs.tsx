import React from 'react';
import { Link } from 'react-admin';
import { Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useLocation } from 'react-router-dom';

export type Crumb = {
  label: string;
  link: string | null;
};

type CrumbsProps = {
  className: string;
  crumbs: Crumb[];
};

const BreadCrumbs = ({ className, crumbs }: CrumbsProps) => {
  const location = useLocation();

  return (
    <Breadcrumbs
      separator="<"
      className={className}
      sx={(theme) => ({
        '& .MuiBreadcrumbs-separator': {
          fontWeight: theme.typography.fontWeightBold,
        },
      })}
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
            <Typography
              key={key}
              color="textPrimary"
              sx={(theme) => ({
                fontSize: theme.typography.body2.fontSize,
                fontWeight: theme.typography.fontWeightBold,
              })}
            >
              {label}
            </Typography>
          );
        }

        if (!link) {
          return null;
        }

        return (
          <Link
            key={key}
            color="inherit"
            to={link}
            sx={(theme) => ({
              fontSize: theme.typography.body2.fontSize,
              fontWeight: theme.typography.fontWeightBold,
            })}
          >
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
