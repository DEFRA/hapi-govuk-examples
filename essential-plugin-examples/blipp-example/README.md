# Blipp example

Displays the routes table to the console at startup.

The following example will build on the [journey map examples](../../journey-map-examples/README.md) and make use of the [blipp](https://www.npmjs.com/package/blipp) plugin in a hapi server.

### Install the plugin
Use npm install
```console
foo@bar:~$ npm install blipp
```

Edit the index.js file to register the blipp plugin
```js
'use strict'

const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })

  await server.register(require('./plugins/frontend.plugin'))
  await server.register(require('./plugins/journey-map.plugin'))
  await server.register(require('blipp'))
  await server.start()

  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
```

Make sure all the javascript files are formatted correctly using standard
```console
foo@bar:~$ npx standard --fix
```

### Make sure the application now works as expected

Now start the server
```console
foo@bar:~$ npm start
```

The console should display
```console
> frontend-example@1.0.0 start /blipp-example
> node index.js

http://localhost:3000
method  path                            description
------  ------------------------------  -----------
GET     /                                          
POST    /                                          
GET     /apology                                   
POST    /apology                                   
GET     /assets/{path*}                            
GET     /completed                                 
GET     /journey-map                               
GET     /journey-map/{id}                          
GET     /like-my-example                           
POST    /like-my-example                           
GET     /like-my-example/comment                   
POST    /like-my-example/comment                   
GET     /measure-satisfaction                      
POST    /measure-satisfaction                      
GET     /measure-satisfaction/comment              
POST    /measure-satisfaction/comment              
GET     /measure-unsatifaction                     
POST    /measure-unsatifaction                     
GET     /measure-unsatifaction/comment             
POST    /measure-unsatifaction/comment             

Server running on http://localhost:3000
```

### Completed blipp example
If all the steps above, have been followed correctly, the project should contain the files found [here](.)

## Other essential plugins
Continue with the [other essential plugins](../README.md)