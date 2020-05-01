# Hapi Govuk examples

An introduction to building a hapi service using the govuk plugins (by example) for the hapi Node.js framework.

_Please note these examples have been developed from what was learned while developing the [permitting proof of concept](https://github.com/DEFRA/permit-poc) which is a good reference point if anything is not clear here._

## Prerequisites
- Node v12+ ([The best way to install Node is via NVM](https://github.com/nvm-sh/nvm))


## The hapi-govuk plugins:
- The [frontend tutorial](#hapi-govuk-frontend) using the [@envage/hapi-govuk-frontend](https://www.npmjs.com/package/@envage/hapi-govuk-frontend) plugin
- The [journey map tutorial](#hapi-govuk-journey-map) using the [@envage/hapi-govuk-journey-map](https://www.npmjs.com/package/@envage/hapi-govuk-journey-map) plugin
- The [question page tutorial](#hapi-govuk-question-page) using the [@envage/hapi-govuk-question-page](https://www.npmjs.com/package/@envage/hapi-govuk-question-page) plugin


## Other essential plugins:
- The [essential plugins tutorial](./essential-plugin-examples/README.md)
    - The [back link plugin](./essential-plugin-examples/back-link-example/README.md)
    - The [csrf crumb plugin](./essential-plugin-examples/csrf-crumb-example/README.md) using the [@hapi/crumb](https://www.npmjs.com/package/@hapi/crumb) plugin
    - The [session cache crumb plugin](./essential-plugin-examples/session-cache-example/README.md) using the [@hapi/yar](https://www.npmjs.com/package/@hapi/yar) plugin
    - The [logging plugin](./essential-plugin-examples/logging-example/README.md) using the [defra-logging-facade](https://github.com/DEFRA/defra-logging-facade) plugin
    - The [form validation module](./essential-plugin-examples/form-validation-example/README.md)
    - The [service status plugin](./essential-plugin-examples/service-status-example/README.md) using the [hapi-version-status](https://www.npmjs.com/package/hapi-version-status) plugin
    - The [robots plugin](./essential-plugin-examples/robots-example/README.md) using the [hapi-robots](https://www.npmjs.com/package/hapi-robots) plugin
    - The [blipp plugin](./essential-plugin-examples/blipp-example/README.md) using the [blipp](https://www.npmjs.com/package/blipp) plugin

--------------------------------

## hapi-govuk-frontend

Provides a simple way to configure the locations of static files, dynamic view layouts and view partials for a hapi server.

The plugin assumes that [Nunjucks](https://mozilla.github.io/nunjucks/) will be used as the view engine.

The [govuk-frontend](https://github.com/alphagov/govuk-frontend) npm module should be installed as a peer dependency.

#### Front end examples:
- [Frontend example introduction](./front-end-examples/README.md)
  - Prepare your environment

- [Frontend example part 1](./front-end-examples/frontend-example-1/README.md)
  - Create the example project including a hapi server with one route

- [Frontend example part 2](./front-end-examples/frontend-example-2/README.md)
  - Introduce the [@envage/hapi-govuk-frontend](https://www.npmjs.com/package/@envage/hapi-govuk-frontend) plugin.
  - Create a home page by modifying the route in the example project with a nunjucks view using the [GOV-UK design system](https://design-system.service.gov.uk/).

- [Frontend example part 3](./front-end-examples/frontend-example-3/README.md)
  - Break the hapi server within the example project into component parts

--------------------------------

## hapi-govuk-journey-map

Provides a way to organise the routes in a hapi server into reusable modules.
Using mapping files, the plugin also provides a way to create journeys within and between each module instance.

#### Journey map examples:
- [Journey map example introduction](./journey-map-examples/README.md)
  - Introduction to the journey map

- [Journey map example part 1](./journey-map-examples/journey-map-example-1/README.md)
  - Without using the Journey map plugin, add a continue button using the nunjucks macro [govukButton](https://design-system.service.gov.uk/components/button/).
  - Clicking the button should redirect to the next page in the journey.

- [Journey map example part 2](./journey-map-examples/journey-map-example-2/README.md)
  - Again without using the Journey map plugin, create a question page including the nunjucks macro [govukRadios](https://design-system.service.gov.uk/components/radios/) and again include a continue button as above to redirect to the next page in the journey.

- [Journey map example part 3](./journey-map-examples/journey-map-example-3/README.md)
  - One more time without using the Journey map plugin, create a completed page including the nunjucks macro [govukPanel](https://design-system.service.gov.uk/components/panel/).

- [Journey map example part 4](./journey-map-examples/journey-map-example-4/README.md)
  - Introduce the [@envage/hapi-govuk-journey-map](https://www.npmjs.com/package/@envage/hapi-govuk-journey-map) plugin.
  - Create a map file to configure the journey between routes.
  - Rearrange the location of the views and routes into a module folder.

- [Journey map example part 5](./journey-map-examples/journey-map-example-5/README.md)
  - Configure the map file to allow branching the journey based on the answer given in the question page.

- [Journey map example part 6](./journey-map-examples/journey-map-example-6/README.md)
  - Introduce the concept of modules to allow re-use of routes and views.
  - Move the question route into a new question module.
  - Include a new comment route within the question module.
  - Create a map file within the question module.
  - Configure the main map file to use the question module.

- [Journey map example part 7](./journey-map-examples/journey-map-example-7/README.md)
  - Introduce the concept of module options as a means of configuring a module.
  - Add the options to the registration of the question module within the main map file.
  - Change the route files for both the question and comment routes to use the options.

- [Journey map example part 8](./journey-map-examples/journey-map-example-8/README.md)
  - Re-use the question module by registering it twice more in the main map file with different module options.

--------------------------------

## hapi-govuk-question-page

Provides a configuration-driven approach to implementing simple pages using the [GOV.UK Design System](https://design-system.service.gov.uk/).

#### Question page examples:
- [Question page example introduction](./question-page-examples/README.md)
  - Introduction to question pages

## Contributing to this project

If you have an idea you'd like to contribute please log an issue.

All contributions should be submitted via a pull request.

## License

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the license

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
