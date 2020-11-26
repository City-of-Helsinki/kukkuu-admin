import { toDateTimeString, toTimeString } from '../../common/utils';
import i18nProvider from '../../common/translation/i18nProvider';

type OccurrenceType = {
  time: string;
  event: {
    duration: number | null;
  };
};

class Occurrence {
  occurrence: OccurrenceType;

  constructor(occurrence: OccurrenceType) {
    this.occurrence = occurrence;
  }

  get time() {
    return toDateTimeString(new Date(this.occurrence.time));
  }

  get startTime() {
    return toTimeString(new Date(this.occurrence.time));
  }

  get endTime() {
    const duration = this.occurrence.event.duration; // minutes

    if (!duration) {
      return null;
    }

    const startTime = new Date(this.occurrence.time);
    const endTime = new Date(startTime.getTime() + 60000 * duration);

    return toTimeString(endTime);
  }

  get duration() {
    return `${this.startTime} - ${this.endTime}`;
  }

  get occurrenceDateAndDuration() {
    return `${this.time} - ${this.endTime}`;
  }

  get title() {
    const translatedResourceName = i18nProvider.translate(
      'occurrences.show.title'
    );

    return `${translatedResourceName} ${this.occurrenceDateAndDuration}`;
  }
}

export default Occurrence;
