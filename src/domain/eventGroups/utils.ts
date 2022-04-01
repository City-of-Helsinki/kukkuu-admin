import { EventGroup_eventGroup_events_edges_node as EventNode } from '../../api/generatedTypes/EventGroup';
import { Record } from '../../api/types';

export enum EventGroupEventsPublishStatusEnum {
  NotReady = 'notReady',
  ReadyForFirstPublish = 'readyForFirstPublish',
  ReadyForRepublish = 'readyForRepublish',
  AllPublished = 'allPublished',
}

export const isEveryEventPublished = (events: EventNode[]) => {
  return events?.every((event) => event.publishedAt !== null) || false;
};

export const isEveryEventReadyForPublish = (events: EventNode[]) => {
  return events?.every((event) => event.readyForEventGroupPublishing) || false;
};

export const getEventGroupPublishStatus = (eventGroup: Record | undefined) => {
  if (eventGroup) {
    if (isEveryEventPublished(eventGroup.events)) {
      return EventGroupEventsPublishStatusEnum.AllPublished;
    } else if (
      !Boolean(eventGroup.publishedAt) &&
      isEveryEventReadyForPublish(eventGroup.events)
    ) {
      return EventGroupEventsPublishStatusEnum.ReadyForFirstPublish;
    } else if (isEveryEventReadyForPublish(eventGroup.events)) {
      return EventGroupEventsPublishStatusEnum.ReadyForRepublish;
    }
  }
  return EventGroupEventsPublishStatusEnum.NotReady;
};
