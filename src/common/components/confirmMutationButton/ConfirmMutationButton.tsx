import React, { ReactElement, ReactText, useState } from 'react';
import { Button, useMutation, Confirm, useNotify } from 'react-admin';
// Import Mutation type more specifically in order to target type
// instead of the Mutation component
import { Mutation } from 'ra-core/lib/dataProvider/useMutation';
import { useHistory } from 'react-router';
import * as Sentry from '@sentry/browser';

type Props = {
  basePath: string;
  className?: string;
  buttonLabel: string;
  mutation: Mutation;
  successMessage: string;
  errorMessage: string;
  confirmModalProps: {
    title: string;
    content: string;
    translateOptions?: Record<string, ReactText>;
  };
  icon?: ReactElement;
};

const ConfirmMutationButton = ({
  basePath,
  className,
  buttonLabel,
  mutation,
  successMessage,
  errorMessage,
  confirmModalProps: { title, content, translateOptions },
  icon: Icon,
}: Props) => {
  const history = useHistory();
  const notify = useNotify();
  const [applyMutation, { loading }] = useMutation(mutation, {
    onSuccess: () => {
      notify(successMessage);
      history.push(basePath);
    },
    onFailure: (error: Error) => {
      Sentry.captureException(error);
      notify(errorMessage, 'warning');
    },
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleSend = () => {
    applyMutation();
    handleDialogClose();
  };

  return (
    <>
      <Button
        onClick={handleDialogOpen}
        label={buttonLabel}
        key="button"
        className={className}
      >
        {Icon && Icon}
      </Button>
      <Confirm
        isOpen={isDialogOpen}
        loading={loading}
        title={title}
        content={content}
        onConfirm={handleSend}
        onClose={handleDialogClose}
        translateOptions={translateOptions}
      />
    </>
  );
};

export default ConfirmMutationButton;
