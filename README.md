#ATOM
https://travis-ci.com/dragos-triteanu/atom-ui.svg?token=VcsipzzjcsgKdCYTMPLV&branch=develop

## Versioning strategy (Gitflow)
  - master     --> release branch
  - develop    --> development branch 
  - demo       --> for presentational use only (@ end of sprint, functionality is demo-ed here)
  - feature    --> used for creating new features
  - components --> used for continuous of UI components
  - bugfix     --> used for fixing up found issues or bugs
  - refactor   --> used for refactoring

Ex. `https://www.atlassian.com/git/tutorials/comparing-workflows#gitflow-workflow`

## Git naming strategy
Naming should be based on : ${branchType}/${asanaTaskId}/${humanlyReadableCommentInCamelCase}

Ex. `feature/bosch-047/toolForm` or `bugfix/bosch-048/toolDetails`

Since components are not directly part of a specific asana task id, they exist as separate branched

Ex. `component/table` or `component/input`


## D.O.D (for each story/deliverable)
When implementing a task, each dev should:
  - implement UI screens based on provided moqups
  - implement UI functionality based on story description/provided docs/what was groomed/moqups intuition
  - implement according API calls. If API is not available, then fakeBackend interceptor implementation should be used.
  - happy flow dev testing (++ since we don't have QA yet)
  - aot compilation with no warnings/errors: `ng serve --aot`
  - linting with no warning/errors : `ng lint`
  - pull request with at least one reviewer approval. Branch should be instantly mergeable
  - log hours in Asana and update status for the story 

## Useful places
Asana: `https://app.asana.com/0/407010469490355/board`
Moqups: `https://docs.google.com/document/d/1Ny_mjwE_Jo-u2ETHx4BpCzBYZzWbHKac5ZhAd4QoWIg/edit?usp=sharing`
Documentation: `https://docs.google.com/document/d/1Ny_mjwE_Jo-u2ETHx4BpCzBYZzWbHKac5ZhAd4QoWIg/edit?usp=sharing`

## Meets + sprint
Sprint duration: `2 weeks`
Weekly status call: `Every thursday, 10:00AM` 
Demo: `Once every two weeks, ~14:00PM@Abacus, even weeks`

# Known issues + improved
1. Create PartNumber, on the create form, there are situations when updating does not link the selected lines.
2. Add delete function to Documents section (this was not considered from the get go)
4. When removing equipments from lines, getToolById will fail due to NPE on BE.
5. Statuses not translated (EX Tool History)
6. Tool Lifetime history UID not visible. Need a strategy for compacting columns
7. Ticket tool scanning --> if a tool from a set is already scanned, upon scanning another tool from the same set, the user will receive an error.
8. Ticket details (ATOM) --> Confirmation for close ticket operation
9. Migrate Part Numbers wizard to app-wizard-modal
10. Migrate Ticket create modal to app-wizard-modal
12. Tool details --> Interventions are not filtrable/sortable (Backend issue)
13. Manage users --> selecting a role on the last dropdown opens up faulty.
14. Tool table (Admin/ATOM) --> Groupers should be chips, but default should be off (grayed out)
15. Process tool requests/returns (ATOM) --> Create a grand material that should have a scrollable content 

# NG

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
