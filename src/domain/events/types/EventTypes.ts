import { AdminUITranslation } from '../../../api/utils/apiUtils';
import { Events_events_edges_node_translations as ApiEventTranslation } from '../../../api/generatedTypes/Events';
import { EventParticipantsPerInvite } from '../../../api/generatedTypes/globalTypes';

export interface AdminEvent {
  id: string;
  participantsPerInvite: EventParticipantsPerInvite;
  capacityPerOccurrence: number;
  duration: number;
  translations: AdminUITranslation<Omit<ApiEventTranslation, 'languageCode'>>;
}
