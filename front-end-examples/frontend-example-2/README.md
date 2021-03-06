# Frontend example part 2
Please note that this continues with the project built within [part 1](../frontend-example-1/README.md)

### Install your new dependencies
The following dependencies are also required:
- [govuk-frontend](https://www.npmjs.com/package/govuk-frontend)
- [@envage/hapi-govuk-frontend](https://www.npmjs.com/package/@envage/hapi-govuk-frontend)
- [nunjucks](https://www.npmjs.com/package/nunjucks)

Install the dependencies using npm
```console
foo@bar:~$ npm install govuk-frontend @envage/hapi-govuk-frontend nunjucks
```

The following development dependency is also required:
- [node-sass](https://www.npmjs.com/package/node-sass) 

Install the required development dependency using npm
```console
foo@bar:~$ npm install node-sass -D
```

Output the contents of the newly created and updated package.json file
```console
foo@bar:~$ cat package.json
```

The expected output should be something like:
```json
{
  "name": "frontend-example",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
      "@envage/hapi-govuk-frontend": "^0.2.1",
      "@hapi/hapi": "^19.1.1",
      "govuk-frontend": "^3.6.0",
      "nunjucks": "^3.2.1"
    },
    "devDependencies": {
      "node-sass": "^4.13.1",
      "standard": "^14.3.3"
    }
}
```
### Build the required css
In order to create a page that adheres to the GOV.UK Design System, we first need to generate a stylesheet.
To do this an application.scss file needs to be created with the correct import statement.
The stylesheet then needs to be generated using node-sass.

Create the application.scss file containing the following
```scss
@import "node_modules/@envage/hapi-govuk-frontend/application.scss";
```

So that the css file will be generated post install, edit the script property within the package.json file so that it contains the postinstall property as follows
```json
"scripts": {
    "start": "node index.js",
    "postinstall": "npx node-sass --output-style=expanded --output=public/build/stylesheets application.scss"
  },
```

In the terminal, type the following to install and trigger the postinstall to generate the css file
```console
foo@bar:~$ npm install
```
The application.css file should have been generated in the location public/build/stylesheets

### Register and configure the frontend plugin
Edit the index.js file so that it now registers the plugin and the route returns a view as follows
```js
'use strict'

const Hapi = require('@hapi/hapi')
const pkg = require('./package.json')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })

  await server.register({
    plugin: require('@envage/hapi-govuk-frontend'),
    options: {
      assetPath: '/assets',
      assetDirectories: ['public/static', 'public/build'],
      serviceName: 'My Generic Government Service',
      viewPath: 'views',
      includePaths: [],
      context: {
        appVersion: pkg.version
      }
    }
  })

  await server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => h.view('home', {
      pageHeading: 'Hello World!',
      pageText: 'Here is my first GOV.UK Design System styled page'
    })
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()

```

Make sure again that index.js is formatted correctly using standard
```console
foo@bar:~$ npx standard --fix
```

### Create your view
The view home.njk needs to be created in the "views" folder to match the view specified above.

Create the "views" folder to store your views
```console
foo@bar:~$ mkdir views
```

Now create your first view by creating the file views/home.njk with the following content
```twig
{% extends "govuk/template.njk" %}

{% from "govuk/components/header/macro.njk" import govukHeader %}

{% block head %}
    <link href="{{ assetPath }}/stylesheets/application.css" rel="stylesheet"/>
{% endblock %}

{% block header %}
    {{ govukHeader({
        homepageUrl: "#",
        containerClasses: "govuk-width-container",
        serviceName: serviceName,
        serviceUrl: "/"
    }) }}
{% endblock %}

{% block pageTitle %}
    {{ pageHeading }} - {{ pageTitle }}
{% endblock %}

{% block content %}
    <h1 class="govuk-heading-xl">{{ pageHeading }}</h1>
    <p class="govuk-body">{{ pageText }}</p>
{% endblock %}

{% block bodyEnd %}
    <script src="{{ assetPath }}/all.js"></script>
    <script>window.GOVUKFrontend.initAll()</script>
{% endblock %}
```

### Make sure the application now works as expected

Restart the server
```console
foo@bar:~$ npm start
```

Check the server is running correctly on [localhost:3000](http://localhost:3000) again

The browser should display: A [GOV.UK Design System styled](https://design-system.service.gov.uk/) web page with the heading **Hello World!**

![alt text](../screen-shots/gds-styled-home.png "GOV.UK Design System styled screen-shot")

### Completed frontend-example part 2
If all the steps above, have been followed correctly, the project should contain the files found [here](.)

## Frontend example part 3
Continue with [part 3](../frontend-example-3/README.md)