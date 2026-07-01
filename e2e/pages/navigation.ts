import type { Page } from '@playwright/test';

export function navigation(page: Page) {
  return {
    events: page.locator(
      '.MuiButtonBase-root.MuiMenuItem-root[href="/events-and-event-groups"]'
    ),
    messages: page.locator(
      '.MuiButtonBase-root.MuiMenuItem-root[href="/messages"]'
    ),
  };
}
