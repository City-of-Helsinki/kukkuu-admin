# Change Log

## [Unreleased]

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

- Occurrence enrollments with no guardians now have placeholder values
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
