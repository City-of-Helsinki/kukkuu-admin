# Change Log

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
