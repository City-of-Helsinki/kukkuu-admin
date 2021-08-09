import { TicketSystem } from '../../api/generatedTypes/globalTypes';

export const participantsPerInviteChoices = [
  {
    id: 'CHILD_AND_GUARDIAN',
    name:
      'events.fields.participantsPerInvite.choices.CHILD_AND_GUARDIAN.label',
  },
  {
    id: 'CHILD_AND_1_OR_2_GUARDIANS',
    name:
      'events.fields.participantsPerInvite.choices.CHILD_AND_1_OR_2_GUARDIANS.label',
  },
  {
    id: 'FAMILY',
    name: 'events.fields.participantsPerInvite.choices.FAMILY.label',
  },
];

export const ticketSystemChoices = [
  {
    id: TicketSystem.INTERNAL,
    name: 'events.fields.ticketSystem.choices.INTERNAL.label',
  },
  {
    id: TicketSystem.TICKETMASTER,
    name: 'events.fields.ticketSystem.choices.TICKETMASTER.label',
  },
];
