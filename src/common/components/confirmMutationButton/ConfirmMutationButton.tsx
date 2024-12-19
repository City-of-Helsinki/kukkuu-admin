import React, { type ReactElement, type ReactText, useState } from 'react';
import { Button, Confirm } from 'react-admin';
import type { useMutation } from 'react-query';

import type {
  MethodHandlerResponse,
  MethodHandlerResponseDataType,
} from '../../../api/types';

type Mutation = ReturnType<
  typeof useMutation<
    MethodHandlerResponse<MethodHandlerResponseDataType>,
    unknown,
    void,
    unknown
  >
>;

type Props = {
  className?: string;
  buttonLabel: string;
  mutation: Mutation;
  confirmModalProps: {
    title: string;
    content: string;
    translateOptions?: Record<string, ReactText>;
  };
  icon?: ReactElement;
};

const ConfirmMutationButton = ({
  className,
  buttonLabel,
  mutation: { mutate: applyMutation, isLoading },
  confirmModalProps: { title, content, translateOptions },
  icon: Icon,
}: Props) => {
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
        loading={isLoading}
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
