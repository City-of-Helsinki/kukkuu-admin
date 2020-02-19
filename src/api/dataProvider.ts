import { getVenues } from '../domain/venues/api/VenueApi';

const VENUES = 'venues';

const getListData = async (resource: string, params: object) => {
  switch (resource) {
    case VENUES:
      return await getVenues(params);
    default:
      throw new Error(`Invalid resource "${resource}"`);
  }
};

const dataProvider = {
  getList: async (resource: string, params: object) => {
    const data = await getListData(resource, params);
    return {
      data,
      total: data.length,
    };
  },
};

export default dataProvider;
