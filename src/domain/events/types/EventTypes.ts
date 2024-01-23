import type { AdminUITranslation } from '../../../api/types';
import type {
  EventGroupNode,
  EventParticipantsPerInvite,
  EventTranslationType,
  TicketSystem,
} from '../../api/generatedTypes/graphql';

export interface AdminEvent {
  id: string;
  participantsPerInvite: EventParticipantsPerInvite;
  capacityPerOccurrence: number;
  duration: number;
  publishedAt?: string;
  translations: AdminUITranslation<Omit<EventTranslationType, 'languageCode'>>;
  eventGroup?: EventGroupNode;
  readyForEventGroupPublishing: boolean;
  project: {
    id: string;
  };
  ticketSystem: {
    type: TicketSystem;
  };
}
