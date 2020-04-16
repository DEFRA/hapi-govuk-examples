# Front end examples

The following examples will make use of the [@envage/hapi-govuk-frontend](https://www.npmjs.com/package/@envage/hapi-govuk-frontend)
plugin to provide a simple way to configure the locations of static files, dynamic view layouts and view partials
for a hapi server.

## Getting started

### Install Node
Check node is installed and is version 12 or greater
```console
foo@bar:~$ node --version
```

If not, install the latest long term supported version (lts) with [NVM](https://github.com/nvm-sh/nvm)
_Take note of the version installed (Currently v12.16.2)_
```console
foo@bar:~$ nvm install --lts
```

Now make sure the version of node just installed is the default (_It was 12 in my case_)
```console
foo@bar:~$ nvm alias default 12
```

### Create your project
Create a new project folder
```console
foo@bar:~$ mkdir hapi-frontend-example-1
foo@bar:~$ cd hapi-frontend-example-1
```

Now initialise your project to create your package.json file with npm init
_Just press enter for all the prompts for now_
```console
foo@bar:~$ npm init
```

Install the required dependencies using npm
```console
foo@bar:~$ npm install @hapi/hapi govuk-frontend @envage/hapi-govuk-frontend node-sass nunjucks -S
```

Output the contents of the newly created and updated package.json file
```console
foo@bar:~$ cat package.json
```

The expected output should be something like:
```json
{
  "name": "hapi-frontend-example-1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@hapi/hapi": "^19.1.1",
    "govuk-frontend": "^3.6.0",
    "@envage/hapi-govuk-frontend": "^0.2.0"
  }
}
```

### Create the server
Create a javascript file called index.js containing the following
```js
'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: () => 'Hello World!'
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
```

Start the server
```console
foo@bar:~$ node index
```

Check the server is running correctly on [localhost:3000](http://localhost:3000)

The browser should display: **Hello World!**

In the terminal, press control-C to stop the server.


### Build the required css
Create the application.scss file containing the following
```scss
@import "node_modules/@envage/hapi-govuk-frontend/application.scss";
```

In the terminal, type the following to generate the public css file
```console
foo@bar:~$ node_modules/.bin/node-sass --output-style=expanded --output=public/build/stylesheets application.scss
```

### Register and configure the frontend plugin
Edit the index.js file so that it now contains the following
```js
'use strict';

const Hapi = require('@hapi/hapi');
const pkg = require('./package.json')

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register([{
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
    }])

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => h.view('hello-world', {
          pageHeading: 'Hello World!',
          pageText: 'Here is my first GDS styled page'
        })
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
```
### Create your view
Create the views folder to store your views
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






