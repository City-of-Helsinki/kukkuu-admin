import React from 'react';
import { ResourceComponentPropsWithId, Link, useTranslate } from 'react-admin';
import { makeStyles } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

export type CrumbConfig = {
  resource: string;
  view: string;
};

type Crumb = {
  label: string;
  link: string;
};

const useStyles = makeStyles((theme) => ({
  crumb: {
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

type CrumbsProps = {
  reactAdminProps: ResourceComponentPropsWithId;
  className: string;
};

// Currently this Breadcrumb implementation only supports linking back
// the list view
const BreadCrumbs = ({ reactAdminProps, className }: CrumbsProps) => {
  const t = useTranslate();
  const classes = useStyles();

  const crumb = {
    label: t(reactAdminProps.options.label) as string,
    link: `/${reactAdminProps.resource}` as string,
  };

  return (
    <Breadcrumbs className={className}>
      <Link className={classes.crumb} to={crumb.link}>
        {`< ${crumb.label}`}
      </Link>
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
