import { screen } from '@testing-library/testcafe';

export function selectOption(
  t: TestController,
  select: Selector,
  value: string
) {
  return t.click(select).click(screen.getByRole('option', { name: value }));
}
