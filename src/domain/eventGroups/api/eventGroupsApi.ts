async function getEventGroup() {
  return {
    data: {
      id: '1',
      name: 'mock event group',
      events: [
        {
          id: '123',
          name: 'mock event',
          participantCount: 13,
        },
      ],
    },
  };
}

async function addEventGroup() {
  return null;
}

async function updateEventGroup() {
  return null;
}

async function deleteEventGroup() {
  return null;
}

async function publishEventGroup() {
  return null;
}

const eventGroupsApi = {
  getEventGroup,
  addEventGroup,
  updateEventGroup,
  deleteEventGroup,
  publishEventGroup,
};

export default eventGroupsApi;
