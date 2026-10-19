import { type ReactElement, useState } from 'react';
import { Button } from 'react-admin';
import type { useMutation } from '@tanstack/react-query';

import type {
  MethodHandlerResponse,
  MethodHandlerResponseDataType,
} from '../../../api/types';
import PublishDialog from './PublishDialog';

type Mutation = ReturnType<
  typeof useMutation<
    MethodHandlerResponse<MethodHandlerResponseDataType>,
    unknown,
    string,
    unknown
  >
>;

type Props = {
  className?: string;
  buttonLabel: string;
  icon?: ReactElement;
  /** The mutation variable is the registration opening time as an ISO string. */
  mutation: Mutation;
  dialogProps: {
    title: string;
    content: string;
    registrationOpensAtHelperText?: string;
  };
};

/**
 * A button that opens a dialog for choosing the registration opening time
 * and then runs the given publish mutation with the chosen time.
 * The dialog closes only when the mutation succeeds, so after a failure the
 * entered time stays available for a retry.
 */
const PublishDialogButton = ({
  className,
  buttonLabel,
  icon,
  mutation: { mutate: applyMutation, isPending: isLoading },
  dialogProps,
}: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        label={buttonLabel}
        key="button"
        className={className}
      >
        {icon}
      </Button>
      <PublishDialog
        {...dialogProps}
        isOpen={isDialogOpen}
        loading={isLoading}
        onConfirm={(registrationOpensAt) => {
          applyMutation(registrationOpensAt, {
            onSuccess: () => setIsDialogOpen(false),
          });
        }}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default PublishDialogButton;
