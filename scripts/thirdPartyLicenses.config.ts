import type { ThirdPartyLicensesConfig } from '@city-of-helsinki/license-notices';

/**
 * Everything about the third-party license notices that is specific to this
 * repository. The generator itself comes from the license-notices package and
 * knows nothing about this project.
 *
 * No license decisions are needed: every bundled package declares a single
 * SPDX license the notices support. This application has no Sass pipeline, so
 * no packages are inlined behind the bundler's back either.
 */
export const thirdPartyLicensesConfig: ThirdPartyLicensesConfig = {
  repositoryUrl: 'https://github.com/City-of-Helsinki/kukkuu-admin',
};
