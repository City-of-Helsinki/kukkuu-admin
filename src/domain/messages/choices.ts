export type RecipientId =
  | 'ALL'
  | 'INVITED'
  | 'ENROLLED'
  | 'ATTENDED'
  | 'SUBSCRIBED_TO_FREE_SPOT_NOTIFICATION';

export const recipientSelectionChoices: { id: RecipientId; name: string }[] = [
  {
    id: 'ALL',
    name: 'messages.fields.recipientSelection.choices.ALL.label',
  },
  {
    id: 'INVITED',
    name: 'messages.fields.recipientSelection.choices.INVITED.label',
  },
  {
    id: 'ENROLLED',
    name: 'messages.fields.recipientSelection.choices.ENROLLED.label',
  },
  {
    id: 'ATTENDED',
    name: 'messages.fields.recipientSelection.choices.ATTENDED.label',
  },
  {
    id: 'SUBSCRIBED_TO_FREE_SPOT_NOTIFICATION',
    name: 'messages.fields.recipientSelection.choices.SUBSCRIBED_TO_FREE_SPOT_NOTIFICATION.label',
  },
];

export const getFilteredRecipientSelectionChoicesByPermissions = ({
  hasPermissionToSendToAll = false,
}: {
  hasPermissionToSendToAll: boolean;
}): typeof recipientSelectionChoices => {
  if (!hasPermissionToSendToAll) {
    return recipientSelectionChoices.filter((choice) => choice.id !== 'ALL');
  }
  return recipientSelectionChoices;
};

export const getRecipientSelectionChoicesByPermissions = ({
  hasPermissionToSendToAll = false,
}: {
  hasPermissionToSendToAll: boolean;
}): typeof recipientSelectionChoices => {
  if (!hasPermissionToSendToAll) {
    return recipientSelectionChoices.map((choice) =>
      choice.id !== 'ALL' ? choice : { ...choice, disabled: true }
    );
  }
  return recipientSelectionChoices;
};

export const recipientsWithEventSelection: RecipientId[] = [
  'ENROLLED',
  'ATTENDED',
  'SUBSCRIBED_TO_FREE_SPOT_NOTIFICATION',
];
