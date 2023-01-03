# Management Services

### Prerequisites

---

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.

If the installation was successful, you should be able to run the following command.

    $ node -v
    v16.13.1

    $ npm -v
    9.19.1
```sh
npm install -g ts-node
```
---

## Features

***management-service-command*** serves only write operations to the database via command handlers in [CQRS pattern](https://docs.nestjs.com/recipes/cqrs).

***management-service-query*** serves only read operations to the database via query handlers in [CQRS pattern](https://docs.nestjs.com/recipes/cqrs).

--- 

### Folders

***application***     - contains command and handlers of differnt modules of the service.

***configuration***   - contains initializers such as configurations for secrets, database connection, loggers etc.

***constant***        - contains application constant variables and messages.

***controllers***     - rest mapping for different resources of the serivce.

***domain***          - contains differrent request, response domain classes, factory methods, repository interfaces etc.

***infrastructure***  - contains entities of different modules, repository implementations etc.

***libraries***       - will be removed, will common library npm package eventually.

***middlewares***     - contains different middleware classes such as exception filtering, logging intercepting, validations etc.

***modules***         - contains differnt modules of the service

---

## Installation

Install the dependencies and devDependencies and start the server.

```sh
cd management-service-command
npm i
npm run start:dev
```
Browse Swagger via http://localhost:8003/api
```sh
cd management-service-query
npm i
npm run start:dev
```
Browse Swagger via http://localhost:8004/api

---
## Running in Docker

#####  Command Service
---
```sh
cd management-service-command
docker build -t management-service-command .
docker run -d -p 8003:8003 management-service-command
```

##### Query Service
---
```sh
cd management-service-query
docker build -t management-service-query .
docker run -d -p 8004:8004 management-service-query
```

## Running via Docker Compose

```sh
cd nest-management-service
docker-compose up -d
```
