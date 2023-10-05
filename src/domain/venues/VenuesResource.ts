import VenueList from './VenueList';
import VenueShow from './VenueShow';
import VenueEdit from './VenueEdit';
import VenueCreate from './VenueCreate';

const venuesResource = {
  List: VenueList,
  Detail: VenueShow,
  Edit: VenueEdit,
  Create: VenueCreate,
};

export default venuesResource;
