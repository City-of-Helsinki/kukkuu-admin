import RelayList from '../relayList';

describe('RelayList', () => {
  const items = [{ id: '123', name: 'test' }];
  const data = {
    edges: items.map((item) => ({ node: item })),
  };

  it('should return items', () => {
    const dataList = RelayList()(data);

    expect(dataList.items).toEqual(items);
  });

  it('should return an empty list if there is no data', () => {
    const dataList = RelayList()(null);

    expect(dataList.items).toEqual([]);
  });
});
