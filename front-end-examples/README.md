# Front end example

The following example will make use of the [@envage/hapi-govuk-frontend](https://www.npmjs.com/package/@envage/hapi-govuk-frontend)
plugin to provide a simple way to configure the locations of static files, dynamic view layouts and view partials
for a hapi server.

## Assumptions
Please note the following assumptions:
- The version of node is 12 or greater
- Styling of the web pages will adhere to the [GDS Design System](https://design-system.service.gov.uk)
- [Nunjucks](https://mozilla.github.io/nunjucks/) will be used to build page views to take
 full advantage of the components supplied within the GDS Design system.
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

### Create your project
Create a new project folder
```console
foo@bar:~$ mkdir frontend-example
foo@bar:~$ cd frontend-example
```

Now initialise your project to create your package.json file with npm init
_Just press enter for all the prompts for now_
```console
foo@bar:~$ npm init
```

The following dependencies are required:
- [@hapi/hapi](https://www.npmjs.com/package/@hapi/hapi)
- [govuk-frontend](https://www.npmjs.com/package/govuk-frontend)
- [@envage/hapi-govuk-frontend](https://www.npmjs.com/package/@envage/hapi-govuk-frontend)
- [nunjucks]()

Install the dependencies using npm
```console
foo@bar:~$ npm install @hapi/hapi govuk-frontend @envage/hapi-govuk-frontend nunjucks -S
```

The following development dependencies are required:
- [node-sass](https://www.npmjs.com/package/node-sass) 
- [standard](https://www.npmjs.com/package/standard)

Install the required development dependencies using npm
```console
foo@bar:~$ npm install node-sass standard -D
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
    "test": "echo \"Error: no test specified\" && exit 1"
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
      "node-sass": "^4.13.1"
    }
}
```

### Create the server
Initially we will create the server in one file with only the home route on http://localhost:3000 defined returning the text "Hello world!"

Create a javascript file called index.js containing the following:
```js
'use strict'

const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })

  await server.route({
    method: 'GET',
    path: '/',
    handler: () => 'Hello World!'
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

Make sure index.js is formatted correctly using standard
```console
foo@bar:~$ npx standard --fix
```

Start the server
```console
foo@bar:~$ node index
```

Check the server is running correctly on [localhost:3000](http://localhost:3000)

The browser should display: **Hello World!**

In the terminal, press control-C to stop the server.


### Build the required css
In order to create a page that adheres to the GDS design, we first need to generate a GDS Stylesheet.
To do this an application.scss file needs to be created with the correct import statement.
The stylesheet then needs to be generated using node-sass.

Create the application.scss file containing the following
```scss
@import "node_modules/@envage/hapi-govuk-frontend/application.scss";
```

In the terminal, type the following to generate the css file
```console
foo@bar:~$ npx node-sass --output-style=expanded --output=public/build/stylesheets application.scss
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
    handler: (request, h) => h.view('hello-world', {
      pageHeading: 'Hello World!',
      pageText: 'Here is my first GDS styled page'
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
The view hello-world.njk needs to be created in the "views" folder to match the view specified above.

Create the "views" folder to store your views
```console
foo@bar:~$ mkdir views
```

Now create your first view by creating the file views/hello-world.njk with the following content
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

Restart the server
```console
foo@bar:~$ node index
```

Check the server is running correctly on [localhost:3000](http://localhost:3000) again

The browser should display: A [GDS styled](https://design-system.service.gov.uk/) web page with the heading **Hello World!**

### Completed frontend-example part 1
If all the steps above, have been followed correctly, the project should contain the files found [here](https://github.com/DEFRA/hapi-govuk-examples/tree/master/front-end-examples/frontend-example-1)

-----------------------------------------------------------------------------------------------------------

## Frontend example part 2

### Break the project down into it's component parts
In order to make it easier to maintain the project and add both additional plugins and routes, the project files need to be broken down into separate files.

Create a separate routes folder
```console
foo@bar:~$ mkdir routes
```

Create the file home.route.js within the routes folder containing the following
```js
'use strict'

module.exports = {
  method: 'GET',
  path: '/',
  handler: (request, h) => h.view('hello-world', {
    pageHeading: 'Hello World!',
    pageText: 'Here is my first GDS styled page'
  })
}
```

Create a separate plugins folder
```console
foo@bar:~$ mkdir plugins
```

Create the file frontend.plugin.js within the plugins folder containing the following
```js
'use strict'

const pkg = require('../package.json')

module.exports = {
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
}
```

Edit the index.js file to import (require) the above files as follows
```js
'use strict'

const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })

  await server.register(require('./plugins/frontend.plugin'))
  await server.route(require('./routes/home.route'))
  await server.start()

  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
```

Make sure all the javascript files above are formatted correctly using standard
```console
foo@bar:~$ npx standard --fix
```

Create a layout in the views folder as layout.njk containing the following
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

{% block bodyEnd %}
    <script src="{{ assetPath }}/all.js"></script>
    <script>window.GOVUKFrontend.initAll()</script>
{% endblock %}
```

Edit the view hello-world.njk so that it extends the layout above
```twig
{% extends "layout.njk" %}

{% block content %}
    <h1 class="govuk-heading-xl">{{ pageHeading }}</h1>
    <p class="govuk-body">{{ pageText }}</p>
{% endblock %}
```

Restart the server
```console
foo@bar:~$ node index
```

Check the server is running correctly on [localhost:3000](http://localhost:3000) again

The browser should display the same [GDS styled](https://design-system.service.gov.uk/) web page with the heading **Hello World!** as before

### Completed frontend-example part 2
If all the steps above, have been followed correctly, the project should contain the files found [here](https://github.com/DEFRA/hapi-govuk-examples/tree/master/front-end-examples/frontend-example-2)

-----------------------------------------------------------------------------------------------------------











