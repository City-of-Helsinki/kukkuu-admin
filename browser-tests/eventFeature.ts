import { routes } from './pages/routes';
import { login } from './utils/login';
import { navigation } from './pages/navigation';
import {
  eventsListPage,
  eventsCreatePage,
  eventsDetailPage,
  eventsEditPage,
  fillCreationForm,
} from './pages/events';

function buildEvent(overrides: any = {}) {
  return {
    name: `Browser test: event feature ${new Date().toLocaleDateString()}`,
    participantsPerInvite: 'Perhe',
    capacityPerOccurrence: 5,
    ...overrides,
  };
}

fixture`Events feature`
  .page(routes.eventsList())
  .beforeEach(async (t) => {
    await login(t);
    await t.click(navigation.events);

    t.ctx.createEvent = buildEvent();
    t.ctx.updateEvent = buildEvent({
      name: `Browser test: event feature (updated) ${new Date().toLocaleDateString()}`,
    });
  })
  .afterEach(async (t) => {
    delete t.ctx.createEvent;
    delete t.ctx.updateEvent;
  });

test('As an admin I want to be able to create, update and delete events', async (t) => {
  const { updateEvent, createEvent } = t.ctx;

  // Go to creation form
  await t.click(eventsListPage.createEventButton);

  // Fill the form and submit it
  await fillCreationForm(t, createEvent);
  await t.click(eventsCreatePage.submitButton);

  // Assert that we have been redirected to the events details
  await t.expect(eventsDetailPage.title(createEvent.name).exists).ok();

  // Go to edit view
  await t.click(eventsDetailPage.editButton);

  // Edit short description and save
  await t
    .selectText(eventsEditPage.nameInput)
    .typeText(eventsEditPage.nameInput, updateEvent.name)
    .click(eventsEditPage.submitButton);

  // Assert that we have been redirected to the events details
  await t.expect(eventsDetailPage.title(updateEvent.name).exists).ok();

  // Go to edit view
  await t.click(eventsDetailPage.editButton);

  // Delete the event
  await t.click(eventsEditPage.deleteButton);

  // Assert that we have been redirected to the events list
  await t.expect(eventsListPage.title.exists).ok();
  // And that the event no longer exists
  await t
    .expect(eventsListPage.eventOrEventGroupByName(updateEvent.name).exists)
    .notOk();
});
