import type { t as testcafeT } from 'testcafe';

// testcafe doesn't export TestController type,
// but it does export `t` which is an instance of TestController,
// so we can get TestController type from it:
export type TestController = typeof testcafeT;
