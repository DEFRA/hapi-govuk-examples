# Front end example

The following example will make use of the [@envage/hapi-govuk-frontend](https://www.npmjs.com/package/@envage/hapi-govuk-frontend)
plugin to provide a simple way to configure the locations of static files, dynamic view layouts and view partials
for a hapi server.

## Assumptions
Please note the following assumptions:
- The version of node is 12 or greater
- Styling of the web pages will adhere to the [GOV.UK Design System](https://design-system.service.gov.uk)
- [Nunjucks](https://mozilla.github.io/nunjucks/) will be used to build page views to take
 full advantage of the components supplied within the GOV.UK Design System.
- [StandardJS](https://standardjs.com/) will be used to make sure the Javascript adheres to the DDTS standards

## Getting started

### Install Node
Check node is installed and is version 12 or greater
```console
foo@bar:~$ node --version
```

If not, install the latest long term supported version (lts) with [NVM](https://github.com/nvm-sh/nvm)
_Take note of the version installed (At the time this was written it was v12.16.2)_
```console
foo@bar:~$ nvm install --lts
```

Now make sure the version of node just installed is the default (_It was 12 in my case_)
```console
foo@bar:~$ nvm alias default 12
```

## Frontend example part 1
Begin with [part 1](frontend-example-1/README.md)