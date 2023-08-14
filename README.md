# Home Library Service
 This is Home Music Library service application with Node.js
 Created with: 
 Node.js 18 LTS
 NestJS 10.0
## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Setup

1. clone this repository
```
git clone https://github.com/UTYFjs/nodejs2023Q2-service.git

```
2. Move to docker-db-orm branch
```
git checkout docker-db-orm
```

3. Copy `.env.example` file in root of the project and rename to `.env`

4. Install dependency
```
npm install
```


## Running application

start locally your Docker Engine, after this run:

```
docker-compose up
```


After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Scan Vulnerabilities
After build images by command 'docker-compose up'  

 Run scan image with application 
  ```
  npm run docker:scan:app
  ```

   Run scan image with PostgresQL 
  ```
  npm run docker:scan:db
  ```

## Testing

After application running by 'docker-compose up' open new terminal and enter:

To run all tests without authorization

```
npm run test
```
also you can run all tests without authorization inside container 
```
npm run test:insidecontainer
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
