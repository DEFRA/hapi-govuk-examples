# Frontend example part 1
Please note that this relies on setting up your environment within [here](../README.md)

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

### Install your dependencies
The following dependency is required:
- [@hapi/hapi](https://www.npmjs.com/package/@hapi/hapi)

Install the dependency using npm
```console
foo@bar:~$ npm install @hapi/hapi
```

The following development dependency is required:
- [standard](https://www.npmjs.com/package/standard)

Install the required development dependency using npm
```console
foo@bar:~$ npm install standard -D
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
      "@hapi/hapi": "^19.1.1"
    },
    "devDependencies": {
      "standard": "^14.3.3"
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

Edit the script property within the package.json file so that it contains the start property as follows
```json
"scripts": {
    "start": "node index.js"
  },
```

Now start the server
```console
foo@bar:~$ npm start
```

Check the server is running correctly on [localhost:3000](http://localhost:3000)

The browser should display: **Hello World!**

In the terminal, press control-C to stop the server.

### Completed frontend-example part 1
If all the steps above, have been followed correctly, the project should contain the files found [here](.)

## Frontend example part 2
Continue with [part 2](../frontend-example-2/README.md)