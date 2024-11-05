# Change Log

## [3.6.0](https://github.com/City-of-Helsinki/kukkuu-admin/compare/kukkuu-admin-v3.5.0...kukkuu-admin-v3.6.0) (2024-11-05)


### Features

* Idle user 60mins logout ([dd95daf](https://github.com/City-of-Helsinki/kukkuu-admin/commit/dd95daf0fae6a96f3f4b0527c33590355f2b117f))

## [3.5.0](https://github.com/City-of-Helsinki/kukkuu-admin/compare/kukkuu-admin-v3.4.0...kukkuu-admin-v3.5.0) (2024-10-28)


### Features

* Add tixly ticket system ([0ea21cf](https://github.com/City-of-Helsinki/kukkuu-admin/commit/0ea21cfaa92bd431cb562d42d48204182a4eea78))
* Arrival status and mark as attended on ticket verification page ([1ab6439](https://github.com/City-of-Helsinki/kukkuu-admin/commit/1ab643900b5e27dd1516badd2e8f4c3d402ae5ab))
* Messages can be sent to all only with special permission ([ed29312](https://github.com/City-of-Helsinki/kukkuu-admin/commit/ed29312fd6920e371bace269159f89002ff50ab5))


### Bug Fixes

* Event api internal enrolment handling ([99b260f](https://github.com/City-of-Helsinki/kukkuu-admin/commit/99b260fd3857c00ef81502c4401b525f9414a809))

## [3.4.0](https://github.com/City-of-Helsinki/kukkuu-admin/compare/kukkuu-admin-v3.3.1...kukkuu-admin-v3.4.0) (2024-09-18)


### Features

* Add pagination to messages list ([dcfbef1](https://github.com/City-of-Helsinki/kukkuu-admin/commit/dcfbef117969d531223e5eecfb04e1d7e60c0067))

## [3.3.1](https://github.com/City-of-Helsinki/kukkuu-admin/compare/kukkuu-admin-v3.3.0...kukkuu-admin-v3.3.1) (2024-09-10)


### Bug Fixes

* The oidc silent token renew should e enabled by default ([1cbd0eb](https://github.com/City-of-Helsinki/kukkuu-admin/commit/1cbd0eb2cf7a59f22c983f2dbc242b4e30e71cf3))

## [3.3.0](https://github.com/City-of-Helsinki/kukkuu-admin/compare/kukkuu-admin-v3.2.1...kukkuu-admin-v3.3.0) (2024-09-05)


### Features

* Add working delete button to unsent message's detail page ([a9285cf](https://github.com/City-of-Helsinki/kukkuu-admin/commit/a9285cfef2d25d6544e20e879bf040dbee90c5a9))


### Bug Fixes

* Update the graphql schema ([4918880](https://github.com/City-of-Helsinki/kukkuu-admin/commit/491888069e3998f412e327501ac7358fb12f8211))

## [3.2.1](https://github.com/City-of-Helsinki/kukkuu-admin/compare/kukkuu-admin-v3.2.0...kukkuu-admin-v3.2.1) (2024-07-05)


### Bug Fixes

* Auth renewal should not reset a selected project ([c7888bf](https://github.com/City-of-Helsinki/kukkuu-admin/commit/c7888bf0c6a2a3f72ffc27a2bc98221a02a4bb6f))

## [3.2.0](https://github.com/City-of-Helsinki/kukkuu-admin/compare/kukkuu-admin-v3.1.0...kukkuu-admin-v3.2.0) (2024-06-11)


### Features

* Add silent token refreshing with Keycloak only ([f05ef57](https://github.com/City-of-Helsinki/kukkuu-admin/commit/f05ef5769ca9157d453e1cdd25beda2a5c03cc70))

## [3.1.0](https://github.com/City-of-Helsinki/kukkuu-admin/compare/kukkuu-admin-v3.0.2...kukkuu-admin-v3.1.0) (2024-05-29)


### Features

* Keycloak support for auth service and provider ([edb6872](https://github.com/City-of-Helsinki/kukkuu-admin/commit/edb6872f8c73a8fdf941dc30b0c8407b16b45b6d))


### Bug Fixes

* ToLocaleString gives different time prefixes in different envs ([3586163](https://github.com/City-of-Helsinki/kukkuu-admin/commit/3586163c1d96580d99b50e2938069592c8bd8ec8))
* Update graphql schema ([4751302](https://github.com/City-of-Helsinki/kukkuu-admin/commit/4751302b432b45a7c3ccc040662af2e53ac84adf))

## [3.0.2](https://github.com/City-of-Helsinki/kukkuu-admin/compare/kukkuu-admin-v3.0.1...kukkuu-admin-v3.0.2) (2024-03-14)


### Bug Fixes

* Occurrence creation and edit view ([0a9353c](https://github.com/City-of-Helsinki/kukkuu-admin/commit/0a9353c68b010dbb50b769c08593e7f31f2e2e5b))

## [3.0.1](https://github.com/City-of-Helsinki/kukkuu-admin/compare/kukkuu-admin-v3.0.0...kukkuu-admin-v3.0.1) (2024-02-15)


### Bug Fixes

* Events empty listing did not render any management buttons ([e390a49](https://github.com/City-of-Helsinki/kukkuu-admin/commit/e390a490102c847618f4b539cfa377feca84bd38))
* Remove the broken birthyear column from occurrence page ([e5b0b0e](https://github.com/City-of-Helsinki/kukkuu-admin/commit/e5b0b0e4192d00395f263996a12bd64953aec066))

## [3.0.0](https://github.com/City-of-Helsinki/kukkuu-admin/compare/kukkuu-admin-v2.0.1...kukkuu-admin-v3.0.0) (2024-01-24)


### ⚠ BREAKING CHANGES

* updated the schemas and types
* update child schema fields

### Features

* Update child schema fields ([2b60b4a](https://github.com/City-of-Helsinki/kukkuu-admin/commit/2b60b4a406dffee2ea0751f1b57c86b1669d8bff))


### Bug Fixes

* Child language choices field value rendering ([92e8f26](https://github.com/City-of-Helsinki/kukkuu-admin/commit/92e8f26323c2c9e1b84f9d534d7d8d02b1eca3cd))
* Child show view should show the birthyear ([0b925bd](https://github.com/City-of-Helsinki/kukkuu-admin/commit/0b925bd910ca5b864e6a6463a8ded8a4836d79fe))
* README omitting necessity of .env file, .env.local is not enough ([457b51c](https://github.com/City-of-Helsinki/kukkuu-admin/commit/457b51c573efad2bc395fd197f71563b37d9d75f))
* Running "yarn test" on Windows by using cross-env ([6f554d6](https://github.com/City-of-Helsinki/kukkuu-admin/commit/6f554d677463c27639956f36086b372bafe3820e))
* Sonarcloud issue typescript:S6582, prefer optional chain expression ([fb7f57b](https://github.com/City-of-Helsinki/kukkuu-admin/commit/fb7f57bd1182825bc852775b9beecdaf8d775b5d))
* Sonarcloud issue typescript:S6606, prefer ?? instead of || ([ae31395](https://github.com/City-of-Helsinki/kukkuu-admin/commit/ae313955fdfe1e8b1a9fef73fdd47d495148a1c9))


### Code Refactoring

* Updated the schemas and types ([3cc0ae3](https://github.com/City-of-Helsinki/kukkuu-admin/commit/3cc0ae3b2805cdcbda9dda9e8e1f407e1159da31))

## [2.0.1](https://github.com/City-of-Helsinki/kukkuu-admin/compare/kukkuu-admin-v2.0.0...kukkuu-admin-v2.0.1) (2023-12-21)


### Bug Fixes

* **messages:** Recipient count in the send email modal window ([9e73664](https://github.com/City-of-Helsinki/kukkuu-admin/commit/9e73664fa87e828f49ca70c6708f593bbadce8c1))
* **messages:** Recipient selection validation after change ([29de740](https://github.com/City-of-Helsinki/kukkuu-admin/commit/29de74013db21040403c0229ab7f82e9dc8ab8e2))
* Transform nulls to empty strings when sending data to the API ([b1d5413](https://github.com/City-of-Helsinki/kukkuu-admin/commit/b1d54131302c62b4900d0a379291b6f0b1d5b668))

## [2.0.0](https://github.com/City-of-Helsinki/kukkuu-admin/compare/kukkuu-admin-v1.11.1...kukkuu-admin-v2.0.0) (2023-10-30)


### ⚠ BREAKING CHANGES

* prettier v3 does not work with jest-snapshot
* messages view
* list pages reload when data changes in the list items
* add the missing save button toolbar into the event creation form
* occurrence creation
* event and groups listings
* the record context is available only inside the ra-view
* **crud:** migrate the views and their types
* **authprovider:** replace a history-hook with window replaceState
* **dataprovider:** migrate undoable to a mutation mode
* **dataprovider:** add query client with cache
* **dataprovider:** migrate queries, types and hooks
* **mui:** migrate the Material-ui v4 to v5
* upgrade all the dependencies

### Features

* Improved language tabs to fix the issues with translatable fields ([7c2df8b](https://github.com/City-of-Helsinki/kukkuu-admin/commit/7c2df8b809b8c9b76c6ec16db2234e3f852a8d84))


### Bug Fixes

* Add the missing save button toolbar into the event creation form ([79ddf0e](https://github.com/City-of-Helsinki/kukkuu-admin/commit/79ddf0e13ae809fbf2dfad6bde8aafe68a29dc78))
* **appbar:** Appbar color styles ([3719e14](https://github.com/City-of-Helsinki/kukkuu-admin/commit/3719e14cac226e5eb4f2c493762aa4b5226963a4))
* Browser test selector and unexpected constant truthiness ([460bea2](https://github.com/City-of-Helsinki/kukkuu-admin/commit/460bea2aa83a0110471865e51c371ecc202c7867))
* Data handling of EventsAndEventGroupsListToolbar-component ([13c98b3](https://github.com/City-of-Helsinki/kukkuu-admin/commit/13c98b35c2effc6d34258c8774ff81a3fa2fe294))
* Default import linter issues ([e19b239](https://github.com/City-of-Helsinki/kukkuu-admin/commit/e19b239d76081aefcdbe8eaf2f4c1e8efe3676a0))
* Event and groups listings ([33a4b95](https://github.com/City-of-Helsinki/kukkuu-admin/commit/33a4b95029759a9096b6760aa6c7de8d839e3cd2))
* Event group route navigation redirect ([3313450](https://github.com/City-of-Helsinki/kukkuu-admin/commit/331345034992eb5da62690c5f36f19e37786a12f))
* Image field on event creation ([696a7fc](https://github.com/City-of-Helsinki/kukkuu-admin/commit/696a7fc7cadc096c1838652ab9bc7d8cd0ce72db))
* Jest-dom extensions and jest env ([1accc72](https://github.com/City-of-Helsinki/kukkuu-admin/commit/1accc7262084a51a2875b1a9463e48fc4411c22d))
* Linter issues ([371c309](https://github.com/City-of-Helsinki/kukkuu-admin/commit/371c30919fccefcdb6334ae199f5791d91f5e7f3))
* List pages reload when data changes in the list items ([0a6626a](https://github.com/City-of-Helsinki/kukkuu-admin/commit/0a6626a7cbd9adf9933f151ff5a72b549eff0008))
* Messages details when no occurrences ([92dbd98](https://github.com/City-of-Helsinki/kukkuu-admin/commit/92dbd98000b1dfe9dea6db3898aa87ad15cb7dce))
* Messages view ([ccaa3b5](https://github.com/City-of-Helsinki/kukkuu-admin/commit/ccaa3b53efa7bb823d1c4a692e0e9c8f0c01cad2))
* **messages:** Occurrence selection ([e3b5345](https://github.com/City-of-Helsinki/kukkuu-admin/commit/e3b53457460dbafec16612a83db7748be5f794c8))
* Occurrence creation ([1f306ea](https://github.com/City-of-Helsinki/kukkuu-admin/commit/1f306ea456d6cf4757ce04a9a42e28e5ef97717e))
* Occurrence edit redirect ([f5389f3](https://github.com/City-of-Helsinki/kukkuu-admin/commit/f5389f309ff1b82a027ff2167b93fb927404276f))
* Prettier issues ([fa21165](https://github.com/City-of-Helsinki/kukkuu-admin/commit/fa211652d0e45cb01e811b883e8bc7b74bc93e26))
* Prettier v3 does not work with jest-snapshot ([22dd196](https://github.com/City-of-Helsinki/kukkuu-admin/commit/22dd1968d9dcc88d1766b62873eb883a00fc63a1))
* Published field -component ([dca9f45](https://github.com/City-of-Helsinki/kukkuu-admin/commit/dca9f450b438064ebebcd6562e811d82c1c04b93))
* Remove the bulk actions from the datagrids ([1bb827f](https://github.com/City-of-Helsinki/kukkuu-admin/commit/1bb827f7f3182a159b8aa506c583b17472f983c9))
* The record context is available only inside the ra-view ([29861e3](https://github.com/City-of-Helsinki/kukkuu-admin/commit/29861e3cc969e7b3e3cd0c25e015c703fa8fe8b8))
* Toolbar projects dropdown ([4120c7e](https://github.com/City-of-Helsinki/kukkuu-admin/commit/4120c7ede65024cbdcdee8f0fa8fca0358621600))
* Venue show view layout ([78dfc47](https://github.com/City-of-Helsinki/kukkuu-admin/commit/78dfc470d00f59e3dd7331e0b54cd0f4d12e1f87))
* View title component mishandled a needles source-attribute ([64292e3](https://github.com/City-of-Helsinki/kukkuu-admin/commit/64292e36b5108397a037756ad9160a591cc0f1a4))


### Code Refactoring

* **authprovider:** Replace a history-hook with window replaceState ([44e6e23](https://github.com/City-of-Helsinki/kukkuu-admin/commit/44e6e232a6a8731a8905a305660b301d93d9eed8))
* **crud:** Migrate the views and their types ([e4ad65f](https://github.com/City-of-Helsinki/kukkuu-admin/commit/e4ad65fef85431b74fe198d93113ead61c75f104))
* **dataprovider:** Add query client with cache ([fb23936](https://github.com/City-of-Helsinki/kukkuu-admin/commit/fb23936bde223698882131c5a44b8e30d16c3c36))
* **dataprovider:** Migrate queries, types and hooks ([6f7462a](https://github.com/City-of-Helsinki/kukkuu-admin/commit/6f7462a63584a9a1d40574012e2066dd5bab4a01))
* **dataprovider:** Migrate undoable to a mutation mode ([8eb993f](https://github.com/City-of-Helsinki/kukkuu-admin/commit/8eb993fc4e6f0d96bbd62e1a391bc7a33ad2992e))
* **mui:** Migrate the Material-ui v4 to v5 ([3dacd0c](https://github.com/City-of-Helsinki/kukkuu-admin/commit/3dacd0c527e20bac0fe2c17b3c92879d3cf1a14d))
* Upgrade all the dependencies ([0f47e2d](https://github.com/City-of-Helsinki/kukkuu-admin/commit/0f47e2d16c141abb45bb0339e639263fad6ed0b2))

## [1.11.1](https://github.com/City-of-Helsinki/kukkuu-admin/compare/kukkuu-admin-v1.11.0...kukkuu-admin-v1.11.1) (2023-08-22)

### Bug Fixes

- Dockerfile base on ubi image DEVOPS-560 ([#239](https://github.com/City-of-Helsinki/kukkuu-admin/issues/239)) ([c6c5c10](https://github.com/City-of-Helsinki/kukkuu-admin/commit/c6c5c1044a5885b4f7eef7839427461eae6e05b4))

## [1.11.0] - 2023-05-10

### Added

- [#234](https://github.com/City-of-Helsinki/kukkuu-admin/pull/234) Add Lippupiste ticket system

## [1.10.1] - 2022-12-09

### Fixed

- [#223](https://github.com/City-of-Helsinki/kukkuu-admin/pull/223) Remove unneeded fields from occurrences query

## [1.10.0] - 2022-12-08

### Added

- [#212](https://github.com/City-of-Helsinki/kukkuu-admin/pull/212) Add import event passwords dialog
- [#213](https://github.com/City-of-Helsinki/kukkuu-admin/pull/213) Add passwords tab for Ticketmaster events
- [#214](https://github.com/City-of-Helsinki/kukkuu-admin/pull/214) Add event related external ticket system URL field
- [#215](https://github.com/City-of-Helsinki/kukkuu-admin/pull/215) Add ticketmaster event end time

### Fixed

- [#217](https://github.com/City-of-Helsinki/kukkuu-admin/pull/217) Tune occurrences queries
- [#218](https://github.com/City-of-Helsinki/kukkuu-admin/pull/218) Improve occurrences tab performance

## [1.9.2] - 2022-12-02

### Fixed

- Fixed Azure pipeline configurations

## [1.9.1] - 2022-12-01

### Fixed

- [#217](https://github.com/City-of-Helsinki/kukkuu-admin/pull/217) Removed unneeded fields from occurrences query to make it faster

## [1.9.0] - 2022-05-27

### Added

- [#201](https://github.com/City-of-Helsinki/kukkuu-admin/pull/201) [#202](https://github.com/City-of-Helsinki/kukkuu-admin/pull/202) Attended enrolment count in occurrence list under event

## [1.8.0] - 2022-04-06

### Added

- [#198](https://github.com/City-of-Helsinki/kukkuu-admin/pull/198) Event group republish features and status indicators

## [1.7.0] - 2022-03-09

### Added

- [#193](https://github.com/City-of-Helsinki/kukkuu-admin/pull/193) Ticket validation view
- [#195](https://github.com/City-of-Helsinki/kukkuu-admin/pull/195) SMS messages
- [#188](https://github.com/City-of-Helsinki/kukkuu-admin/pull/188) Azure-pipeline configurations

## [1.6.1] - 2021-12-09

### Added

- [#183](https://github.com/City-of-Helsinki/kukkuu-admin/pull/183) Use backend's new authentication error codes

## [1.6.0] - 2021-11-23

### Added

- [#178](https://github.com/City-of-Helsinki/kukkuu-admin/pull/178) Error page for authentication
- [#179](https://github.com/City-of-Helsinki/kukkuu-admin/pull/179) Guardian phone number to occurrence show view enrolments list

### Fixed

- [#176](https://github.com/City-of-Helsinki/kukkuu-admin/pull/176) Occurrence notification subscription always being shown as 0
- [#177](https://github.com/City-of-Helsinki/kukkuu-admin/pull/177) Total capacity count in event and event groups list
- [#178](https://github.com/City-of-Helsinki/kukkuu-admin/pull/178) Flaky login when redirect target was unclear or the sign in callback page itself
- [#179](https://github.com/City-of-Helsinki/kukkuu-admin/pull/179) Clicking a row in occurrence show view enrolments list

## [1.5.5] - 2021-04-26

### Added

- [#161](https://github.com/City-of-Helsinki/kukkuu-admin/pull/161) Test label in the login view in the test environment

### Changed

- [#157](https://github.com/City-of-Helsinki/kukkuu-admin/pull/157) Hide create event button when project does not allow loose events
- [#158](https://github.com/City-of-Helsinki/kukkuu-admin/pull/158) Hide event group create and edit button when the user is not authorized with CRUD permissions

### Fixed

- [#159](https://github.com/City-of-Helsinki/kukkuu-admin/pull/159) Zero recipient count being shown as a question mark
- [#160](https://github.com/City-of-Helsinki/kukkuu-admin/pull/160) Image being unremovable after saving
- [#165](https://github.com/City-of-Helsinki/kukkuu-admin/pull/165) Event editing causing its event group to be nullified

## [1.5.4] - 2021-02-11

### Fixed

- [#154](https://github.com/City-of-Helsinki/kukkuu-admin/pull/154) Production build API URL

## [1.5.3] - 2021-02-10

### Changed

- [#139](https://github.com/City-of-Helsinki/kukkuu-admin/pull/139) Application title
- [#141](https://github.com/City-of-Helsinki/kukkuu-admin/pull/141) Distinct test environment from production environment
- [#152](https://github.com/City-of-Helsinki/kukkuu-admin/pull/152) Translation sheet to one controlled by the executive office
- [#148](https://github.com/City-of-Helsinki/kukkuu-admin/pull/148) Hide publish button if user does not have permission to publish

### Fixed

- [#142](https://github.com/City-of-Helsinki/kukkuu-admin/pull/142) Missing labels in venue and event detail views
- [#144](https://github.com/City-of-Helsinki/kukkuu-admin/pull/144) Slow update of event and event group list by using confirmation pattern instead of undo pattern when deleting events
- [#147](https://github.com/City-of-Helsinki/kukkuu-admin/pull/147) Occurrence view crash on reload
- [#151](https://github.com/City-of-Helsinki/kukkuu-admin/pull/151) Crashing venue editing field when re-entering after a successful edit
- [#140](https://github.com/City-of-Helsinki/kukkuu-admin/pull/140), [#145](https://github.com/City-of-Helsinki/kukkuu-admin/pull/145) Event editing leading to an error when user set a non-required string value as empty

### Removed

- [#143](https://github.com/City-of-Helsinki/kukkuu-admin/pull/143) Helper text from venue amenities field

## [1.5.2] - 2021-01-28

No changes to source. Transferred infrastructure.

## [1.5.1] - 2021-01-19

### Added

- [#132](https://github.com/City-of-Helsinki/kukkuu-admin/pull/132) Add project select

### Changed

- [#130](https://github.com/City-of-Helsinki/kukkuu-admin/pull/130) Use GitHub flow instead of GitFlow

### Fixed

- [#134](https://github.com/City-of-Helsinki/kukkuu-admin/pull/134) Authorization check
- [#134](https://github.com/City-of-Helsinki/kukkuu-admin/pull/134) Unauthorized view styles

## [1.5.0] - 2020-12-17

### Added

- [#109](https://github.com/City-of-Helsinki/kukkuu-admin/pull/109) View for viewing event group details
- [#110](https://github.com/City-of-Helsinki/kukkuu-admin/pull/110) Breadcrumbs to event and event group views
- [#111](https://github.com/City-of-Helsinki/kukkuu-admin/pull/111) Event group creation view
- [#111](https://github.com/City-of-Helsinki/kukkuu-admin/pull/111) Event group editing view
- [#115](https://github.com/City-of-Helsinki/kukkuu-admin/pull/115) View for adding an event to an event group
- [#117](https://github.com/City-of-Helsinki/kukkuu-admin/pull/117) Breadcrumb to occurrence detail view
- [#118](https://github.com/City-of-Helsinki/kukkuu-admin/pull/118) Event group publish button
- [#127](https://github.com/City-of-Helsinki/kukkuu-admin/pull/127) Event ready button for event in an event group

### Changed

- [#107](https://github.com/City-of-Helsinki/kukkuu-admin/pull/107) apollo-client version to 3.0 branch
- [#112](https://github.com/City-of-Helsinki/kukkuu-admin/pull/112) Use GitHub Actions instead of Travis

## [1.4.0] - 2020-11-11

### Added

- Messages feature

## [1.3.0] - 2020-10-15

### Added

- Occurrence enrolments with no guardians now have placeholder values
- Number of people in queue and enrolled to event occurrence
- Number of people in queue to event page

### Fixed

- Reloading occurrence show field no longer returns a blank page

# 1.2.0

- Add occurrence `capacityOverride` field handling in create, edit and show occurrence views

This version requires Kukkuu backend v1.4.0 or newer.

# 1.1.0

- Hide export buttons
- Prevent published occurrence editing
- Enable event participants CHILD_AND_1_OR_2_GUARDIANS choice
- Make text fields render line breaks

# 1.0.1 - 1.0.3

Configuration changes to enable authentication for production environment.

# 1.0.0

First public release
