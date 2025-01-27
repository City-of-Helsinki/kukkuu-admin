import { screen } from '@testing-library/testcafe';
import type { Selector } from 'testcafe';

import type { TestController } from '../types';

export function selectOption(
  t: TestController,
  select: Selector,
  value: string
) {
  return t.click(select).click(screen.getByRole('option', { name: value }));
}
