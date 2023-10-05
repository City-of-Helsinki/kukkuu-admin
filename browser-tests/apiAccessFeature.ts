import { login } from './utils/login';
import { tunnistamoUserAccesses } from './api/userTunnistamo';
import { envUrl } from './utils/settings';

fixture`Api access feature`.page(envUrl()).beforeEach(async (t) => {
  await login(t);
});

test('Ensure tunnistamo user has accesses', async (t) => {
  await tunnistamoUserAccesses(t);
});
