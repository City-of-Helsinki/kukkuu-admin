import {
  recipientSelectionChoices,
  recipientsWithEventSelection,
  getRecipientSelectionChoicesByPermissions,
  getFilteredRecipientSelectionChoicesByPermissions,
} from '../choices';

describe('messages/choices', () => {
  describe('getRecipientSelectionChoicesByPermissions', () => {
    it('returns all choices with none disabled when user has ALL permission', () => {
      const choices = getRecipientSelectionChoicesByPermissions({
        hasPermissionToSendToAll: true,
      });
      expect(choices).toHaveLength(recipientSelectionChoices.length);
      expect(choices.every((c: any) => !c.disabled)).toBe(true);
    });

    it('disables the ALL choice while keeping the rest enabled when the user lacks ALL permission', () => {
      const choices = getRecipientSelectionChoicesByPermissions({
        hasPermissionToSendToAll: false,
      });
      const all = choices.find((c) => c.id === 'ALL') as any;
      const others = choices.filter((c) => c.id !== 'ALL');
      expect(choices).toHaveLength(recipientSelectionChoices.length);
      expect(all?.disabled).toBe(true);
      expect(others.every((c: any) => !c.disabled)).toBe(true);
    });
  });

  describe('getFilteredRecipientSelectionChoicesByPermissions', () => {
    it('omits the ALL choice when the user lacks ALL permission', () => {
      const choices = getFilteredRecipientSelectionChoicesByPermissions({
        hasPermissionToSendToAll: false,
      });
      expect(choices).toHaveLength(recipientSelectionChoices.length - 1);
      expect(choices.some((c) => c.id === 'ALL')).toBe(false);
    });

    it('returns all choices when the user has ALL permission', () => {
      const choices = getFilteredRecipientSelectionChoicesByPermissions({
        hasPermissionToSendToAll: true,
      });
      expect(choices).toEqual(recipientSelectionChoices);
    });
  });

  describe('recipientsWithEventSelection', () => {
    it('lists exactly the recipient ids that require an event selection', () => {
      expect(recipientsWithEventSelection).toEqual([
        'ENROLLED',
        'ATTENDED',
        'SUBSCRIBED_TO_FREE_SPOT_NOTIFICATION',
      ]);
    });
  });
});
