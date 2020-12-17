# Change Log

## [Unreleased]

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
