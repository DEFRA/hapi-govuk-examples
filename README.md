# hapi-govuk-examples

An introduction to the govuk plugins (by example) for the hapi Node.js framework.


## The hapi-govuk plugins:
- [hapi-govuk-frontend](#hapi-govuk-frontend)
- [hapi-govuk-journey-map](#hapi-govuk-journey-map)
- [hapi-govuk-question-page](#hapi-govuk-frontend)

## hapi-govuk-frontend

Provides a simple way to configure the locations of static files, dynamic view layouts and view partials for a hapi server.
The plugin assumes that [Nunjucks](https://mozilla.github.io/nunjucks/) will be used as the view engine.
The [govuk-frontend](https://github.com/alphagov/govuk-frontend) npm module should be installed as a peer dependency.

See [examples](./front-end-examples)


## hapi-govuk-journey-map

Provides a way to organise the routes in a hapi server into reusable modules.
Using mapping files, the plugin also provides a way to create journeys within and between each module instance.

See [examples](./journey-map-examples)


## hapi-govuk-question-page

Provides a configuration-driven approach to implementing simple pages using the [GOV.UK Design System](https://design-system.service.gov.uk/).

See [examples](./question-page-examples)

