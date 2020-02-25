import { AdminUITranslation } from '../../../api/utils/apiUtils';
import { Events_events_edges_node_translations as ApiEventTranslation } from '../../../api/generatedTypes/Events';

export interface AdminEvent {
  id: string;
  translations: AdminUITranslation<Omit<ApiEventTranslation, 'languageCode'>>;
}
