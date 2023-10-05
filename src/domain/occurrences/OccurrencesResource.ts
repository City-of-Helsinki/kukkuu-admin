import OccurrenceCreate from './OccurrenceCreate';
import OccurrenceShow from './OccurrenceShow';
import OccurrenceEdit from './OccurrenceEdit';

const occurrencesResource = {
  Create: OccurrenceCreate,
  Detail: OccurrenceShow,
  Edit: OccurrenceEdit,
};

export default occurrencesResource;
