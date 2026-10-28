import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export async function selectMuiOption(
  page: Page,
  trigger: Locator,
  value: string
): Promise<void> {
  await trigger.click();
  // Wait for the listbox to actually open before we try to click an option —
  // without this, the option click can race with the open animation and miss.
  const listbox = page.getByRole('listbox');
  await expect(listbox).toBeVisible();
  await listbox.getByRole('option', { name: value, exact: true }).click();
  // Wait for the listbox to close so subsequent form interactions don't race
  // with the closing animation.
  await expect(listbox).toBeHidden();
}

/**
 * Selects all the given options in a multiple select and closes the listbox.
 * The listbox stays open after each option click, so it is closed explicitly.
 */
export async function selectMuiOptions(
  page: Page,
  trigger: Locator,
  values: string[]
): Promise<void> {
  await trigger.click();
  const listbox = page.getByRole('listbox');
  await expect(listbox).toBeVisible();
  for (const value of values) {
    await listbox.getByRole('option', { name: value, exact: true }).click();
  }
  await page.keyboard.press('Escape');
  await expect(listbox).toBeHidden();
}
