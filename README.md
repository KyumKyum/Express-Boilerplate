## Express Boilerplate
#### Customized by Jay Lim (for personnal uses.)

<p align="center">
 <img src="https://i.cloudup.com/zfY6lL7eFa-3000x3000.png" width="200" alt="Express Logo" />
</p>


<p align='center'>
<img alt="Typescript" src ="https://img.shields.io/badge/Typescript-3178C6.svg?&style=for-the-badge&logo=Typescript&logoColor=white"/>
<img alt="PostgreSQL" src ="https://img.shields.io/badge/PostgreSQL-4169E1.svg?&style=for-the-badge&logo=PostgreSQL&logoColor=white"/>
<img alt="Redis" src ="https://img.shields.io/badge/Redis-DC382D.svg?&style=for-the-badge&logo=Redis&logoColor=white"/>
<img alt="Prisma" src ="https://img.shields.io/badge/Prisma-2D3748.svg?&style=for-the-badge&logo=Prisma&logoColor=white"/>
<img alt="Passport" src ="https://img.shields.io/badge/Passport-34E27A.svg?&style=for-the-badge&logo=passport&logoColor=white"/>
<img alt="Swagger" src ="https://img.shields.io/badge/Swagger-85EA2D.svg?&style=for-the-badge&logo=swagger&logoColor=black"/>
<img alt="Docker / Docker Compose" src ="https://img.shields.io/badge/Docker / Docker Compose-2496ED.svg?&style=for-the-badge&logo=Docker&logoColor=white"/>
<img alt="AJV" src ="https://img.shields.io/badge/AJV-23C8D2.svg?&style=for-the-badge&logo=ajv&logoColor=white"/>
<img alt="Jest" src ="https://img.shields.io/badge/Jest-C21325.svg?&style=for-the-badge&logo=jest&logoColor=white"/>
</p>

# TODO: DB Setting, Redis, Prisma, Swagger, Docker Compose, Passport

#### Installation

```bash
$ npm install
```

#### Before Start
###### 1. Dev - ProstgresQL, Redis
```bash
sh src/script/setup.sh
```
###### 2. Dev - PostgresQL, Redis, Kafka
```bash
docker compose up -d
```
#### Running the app

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

# test coverage
$ npm run test:cov
```

This boilerplate had been inspired by code from [nestjs-boilerplate](https://github.com/brocoders/nestjs-boilerplate). I made this boilerplate for my personal uses.


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

