import { TicketSystem } from '../api/generatedTypes/graphql';

export const participantsPerInviteChoices = [
  {
    id: 'CHILD_AND_GUARDIAN',
    name: 'events.fields.participantsPerInvite.choices.CHILD_AND_GUARDIAN.label',
  },
  {
    id: 'CHILD_AND_1_OR_2_GUARDIANS',
    name: 'events.fields.participantsPerInvite.choices.CHILD_AND_1_OR_2_GUARDIANS.label',
  },
  {
    id: 'FAMILY',
    name: 'events.fields.participantsPerInvite.choices.FAMILY.label',
  },
];

export const ticketSystemChoices = [
  {
    id: TicketSystem.Internal,
    name: 'events.fields.ticketSystem.choices.INTERNAL.label',
  },
  {
    id: TicketSystem.Ticketmaster,
    name: 'events.fields.ticketSystem.choices.TICKETMASTER.label',
  },
  {
    id: TicketSystem.Lippupiste,
    name: 'events.fields.ticketSystem.choices.LIPPUPISTE.label',
  },
];
