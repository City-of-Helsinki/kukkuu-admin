import { routes } from './pages/routes';
import { login } from './utils/login';
import { navigation } from './pages/navigation';
import {
  eventsListPage,
  eventsCreatePage,
  fillCreationForm,
} from './pages/events';
import {
  eventGroupsCreatePage,
  eventGroupsDetailPage,
  eventGroupsEditPage,
} from './pages/eventGroups';

function includes(text: string, values: string[]): boolean {
  return values.reduce(
    (includesAll, value) => includesAll && text.includes(value),
    true
  );
}

function buildEventGroup(overrides: any = {}) {
  return {
    name: `Browser test created event group ${new Date().toLocaleDateString()}`,
    shortDescription: 'Browser test event group',
    description:
      // eslint-disable-next-line max-len
      'If you are seeing this event, it means that a browser test has failed. You can use the date in the title to find out the date of the failure.',
    ...overrides,
  };
}

function buildEvent() {
  return {
    name: `Browser test: add event to event group ${new Date().toLocaleDateString()}`,
    participantsPerInvite: 'Perhe',
    capacityPerOccurrence: 5,
  };
}

fixture`Event groups feature`
  .page(routes.eventsList())
  .beforeEach(async (t) => {
    await login(t);
    await t.click(navigation.events);

    t.ctx.createEventGroup = buildEventGroup();
    t.ctx.updateEventGroup = buildEventGroup({
      shortDescription: 'Browser test event group (updated)',
    });
    t.ctx.addEventToEventGroup = buildEvent();
  })
  .afterEach(async (t) => {
    delete t.ctx.eventGroup;
    delete t.ctx.updateEventGroup;
    delete t.ctx.addEventToEventGroup;
  });

test('As an admin I want to see event groups within the event list', async (t) => {
  // Expect the list to have event groups
  await t
    .expect(eventsListPage.listBody.withText('TAPAHTUMARYHMÄ').count)
    .gt(0);
});

test('As an admin I want to be able to open an event group and see the events in the event group', async (t) => {
  const eventGroupRow = eventsListPage.anyEventGroup.child();
  const eventGroupName = await eventGroupRow.child().nth(0).textContent;

  // Go to event group
  await t.click(eventGroupRow);

  // Assert that we are in the correct page
  await t.expect(eventGroupsDetailPage.title.textContent).eql(eventGroupName);

  // Assert that there's a list of events
  const listHeaders = await eventGroupsDetailPage.eventListHeader.textContent;
  await t
    .expect(
      includes(listHeaders, [
        'Nimi',
        'Osallistujat kutsua kohden',
        'Kesto',
        'Kokonaiskapasiteetti',
        'Esiintymiä',
        'Ilmoittautuneita',
      ])
    )
    .ok();
  await t.expect(eventGroupsDetailPage.eventList.childNodeCount).gt(0);
});

test('As an admin I want to be able to create, update and delete event groups', async (t) => {
  const { name, shortDescription, description } = t.ctx.createEventGroup;
  const { updateEventGroup } = t.ctx;

  // Go to creation form
  await t.click(eventsListPage.createEventGroupButton);

  // Fill the form and submit it
  await t
    .typeText(eventGroupsCreatePage.nameInput, name)
    .typeText(eventGroupsCreatePage.shortDescriptionInput, shortDescription)
    .typeText(eventGroupsCreatePage.descriptionInput, description)
    .click(eventGroupsCreatePage.submitButton);

  // Assert that we have been redirected to the events list
  await t.expect(eventsListPage.title.exists).ok();

  // Select the event group we created
  await t.click(eventsListPage.eventOrEventGroupByName(name));

  // Go to edit view
  await t.click(eventGroupsDetailPage.editButton);

  // Edit short description and save
  await t
    .selectText(eventGroupsEditPage.shortDescriptionInput)
    .typeText(
      eventGroupsEditPage.shortDescriptionInput,
      updateEventGroup.shortDescription
    )
    .click(eventGroupsEditPage.saveButton);

  // Assert that we have been redirected to the events list
  await t.expect(eventsListPage.title.exists).ok();

  // Select the event group we created and edited
  await t.click(eventsListPage.eventOrEventGroupByName(name));

  // Go to edit view
  await t.click(eventGroupsDetailPage.editButton);

  // Delete the group
  await t
    .click(eventGroupsEditPage.deleteButton)
    .click(eventGroupsEditPage.confirmDeleteButton);

  // Assert that we have been redirected to the events list
  await t.expect(eventsListPage.title.exists).ok();
});

test('As an admin I want to be able to add events to an event group', async (t) => {
  const event = t.ctx.addEventToEventGroup;

  // Select any event group
  await t.click(eventsListPage.anyEventGroup);

  // Save its name so we can assert on it later
  const eventGroupName = await eventGroupsDetailPage.title.textContent;

  // Go to view for adding an event into the event group
  await t.click(eventGroupsDetailPage.addEventToEventGroupButton);

  // Assert that we are in the event creation view
  await t.expect(eventsCreatePage.title.exists).ok();

  // Fill the form and submit
  await fillCreationForm(t, event);
  await t.click(eventsCreatePage.submitButton);

  // Assert that we are back on the event group details page
  await t.expect(eventGroupsDetailPage.title.textContent).eql(eventGroupName);
  // Assert that the created event can be found from the event list
  await t.expect(eventGroupsDetailPage.getEventGroup(event.name).exists).ok();
});
