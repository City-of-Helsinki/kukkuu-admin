import { AdminUITranslation } from '../../../api/types';
import { Events_events_edges_node_translations as ApiEventTranslation } from '../../../api/generatedTypes/Events';
import { Event_event_eventGroup as EventGroup } from '../../../api/generatedTypes/Event';
import { EventParticipantsPerInvite } from '../../../api/generatedTypes/globalTypes';

export interface AdminEvent {
  id: string;
  participantsPerInvite: EventParticipantsPerInvite;
  capacityPerOccurrence: number;
  duration: number;
  publishedAt?: string;
  translations: AdminUITranslation<Omit<ApiEventTranslation, 'languageCode'>>;
  eventGroup?: EventGroup;
}
