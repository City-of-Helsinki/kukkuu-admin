import type { AdminUITranslation } from '../../../api/types';
import type {
  EventGroupNode,
  EventParticipantsPerInvite,
  EventTranslationType,
  OrganisationNode,
  ThemePathNode,
  TicketSystem,
} from '../../api/generatedTypes/graphql';

export interface AdminEvent {
  id: string;
  participantsPerInvite: EventParticipantsPerInvite;
  capacityPerOccurrence: number;
  duration: number;
  publishedAt?: string;
  registrationOpensAt?: string | null;
  translations: AdminUITranslation<Omit<EventTranslationType, 'languageCode'>>;
  eventGroup?: EventGroupNode;
  readyForEventGroupPublishing: boolean;
  project: {
    id: string;
  };
  organisation?: OrganisationNode;
  organisationId?: string;
  themePaths?: Pick<ThemePathNode, 'id' | 'slug' | 'name'>[];
  ticketSystem: {
    type: TicketSystem;
  };
}
