import { routes } from './pages/routes';
import { login } from './utils/login';
import { navigation } from './pages/navigation';
import { eventsListPage } from './pages/events';
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

fixture`Event groups feature`
  .page(routes.eventsList())
  .beforeEach(async (t) => {
    await login(t);
    await t.click(navigation.events);

    t.ctx.createEventGroup = buildEventGroup();
    t.ctx.updateEventGroup = buildEventGroup({
      shortDescription: 'Browser test event group (updated)',
    });
  })
  .afterEach(async (t) => {
    delete t.ctx.eventGroup;
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
  await t.click(eventsListPage.itemByName(name));

  // Go to edit view
  await t.click(eventGroupsDetailPage.editButton);

  // Delete the group
  await t
    .click(eventGroupsEditPage.deleteButton)
    .click(eventGroupsEditPage.confirmDeleteButton);

  // Assert that we have been redirected to the events list
  await t.expect(eventsListPage.title.exists).ok();
});
