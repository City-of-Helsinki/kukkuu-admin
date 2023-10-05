import { routes } from './pages/routes';
import { login } from './utils/login';
import { navigation } from './pages/navigation';
import {
  eventsListPage,
  eventsCreatePage,
  fillCreationForm as fillEventCreationForm,
  eventsEditPage,
  eventsDetailPage,
  deleteEvent,
} from './pages/events';
import {
  eventGroupsDetailPage,
  eventGroupsEditPage,
  createEventGroup,
  deleteEventGroup,
} from './pages/eventGroups';

function includes(text: string, values: string[]): boolean {
  return values.reduce(
    (includesAll, value) => includesAll && text.includes(value),
    true
  );
}

function buildEventGroup(overrides: any = {}) {
  const { name = 'Browser test: add event to event group', ...rest } =
    overrides;

  return {
    name: `${name} ${new Date().toLocaleDateString()}`,
    shortDescription: 'Browser test event group',
    description:
      // eslint-disable-next-line max-len
      'If you are seeing this event group, it means that a browser test has failed. You can use the date in the title to find out the date of the failure.',
    ...rest,
  };
}

function buildEvent(overrides: any = {}) {
  const { name = 'Browser test: add event to event group', ...rest } =
    overrides;

  return {
    name: `${name} ${new Date().toLocaleDateString()}`,
    participantsPerInvite: 'Perhe',
    capacityPerOccurrence: 5,
    ...rest,
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
    t.ctx.publishEventGroup = buildEventGroup({
      name: 'Browser test: publish event group',
    });
  })
  .afterEach(async (t) => {
    delete t.ctx.eventGroup;
    delete t.ctx.updateEventGroup;
    delete t.ctx.publishEventGroup;
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
  await createEventGroup(t, { name, shortDescription, description });

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
  await fillEventCreationForm(t, event);
  await t.click(eventsCreatePage.submitButton);

  // Assert that we are back on the event group details page
  await t.expect(eventGroupsDetailPage.title.textContent).eql(eventGroupName);
  // Assert that the created event can be found from the event list
  await t.expect(eventGroupsDetailPage.getEvent(event.name).exists).ok();
}).after(async (t) => {
  const event = t.ctx.addEventToEventGroup;

  await t.click(eventGroupsDetailPage.getEvent(event.name));

  await deleteEvent(t);

  await t.expect(eventGroupsDetailPage.getEvent(event.name).exists).notOk();
});

test('As an admin I want to be able to publish an event group', async (t) => {
  const event = t.ctx.addEventToEventGroup;
  const { publishEventGroup } = t.ctx;

  await createEventGroup(t, publishEventGroup);

  // Select created event
  await t.click(eventsListPage.eventOrEventGroupByName(publishEventGroup.name));

  // Go to view for adding an event into the event group
  await t.click(eventGroupsDetailPage.addEventToEventGroupButton);

  // Assert that we are in the event creation view
  await t.expect(eventsCreatePage.title.exists).ok();

  // Fill the form and submit
  await fillEventCreationForm(t, event);
  await t.click(eventsCreatePage.submitButton);

  // Assert that we are back on the event group details page
  await t
    .expect(eventGroupsDetailPage.title.textContent)
    .eql(publishEventGroup.name);

  // Goto event
  await t.click(eventGroupsDetailPage.getEvent(event.name));
  // Set event ready for publish
  await t.click(eventsDetailPage.readyToggle);

  // event group details page
  await t.click(eventsDetailPage.eventGroupLink(publishEventGroup.name));

  // Publish
  await t
    .click(eventGroupsDetailPage.publishButton)
    .click(eventGroupsDetailPage.publishConfirmButton);

  // Select published event
  await t.click(eventsListPage.eventOrEventGroupByName(publishEventGroup.name));

  // Expect publish button to be hidden
  await t.expect(eventGroupsDetailPage.publishButton.exists).notOk();
}).after(async (t) => {
  const event = t.ctx.addEventToEventGroup;
  const { publishEventGroup } = t.ctx;

  // delete event from event group
  await t.click(eventGroupsDetailPage.getEvent(event.name));
  await deleteEvent(t);

  // delete event group
  await t.click(eventsListPage.eventOrEventGroupByName(publishEventGroup.name));
  await deleteEventGroup(t);
});
