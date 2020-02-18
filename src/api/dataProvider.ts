import getVenueList from './venues/getList';

const VENUES = 'venues';

const getListData = async (resource: string, params: object) => {
  switch (resource) {
    case VENUES:
      return await getVenueList(params);
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
