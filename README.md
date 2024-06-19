# zkVoting Notification Service API
> Service API dedicated for mass-notification functionality.

## TODO: The boilerplating had not been finished yet.

#### Installation

```bash
$ npm install
```

#### Before Start

```bash
# For development
$ npm run start:dev

# For production
$ npm run start:prod
```

#### Test

```bash
# unit tests
$ npm run test
```This boilerplate had been inspired by code from [nestjs-boilerplate](https://github.com/brocoders/nestjs-boilerplate). I made this boilerplate for my personal uses.


### Request & Response Logic Flow
```text
Incoming Request
-> Guards (CORS, Auth related, Rate-limiting (if required))
-> Interceptors (Logger)
-> Pipes (Validation, Transformation, Sanitization)
-> Controller
-> Service
-> Interceptors (Logger)
-> Filter (Error Handler)
-> Outgoing Response
```

