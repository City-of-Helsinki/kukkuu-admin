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
