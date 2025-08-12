# kharcha-api

The API project to power the kharcha project

## Description

[add info about the project here]

## Project setup

```bash
$ pnpm install
$ pnpm setup-husky
```

## Postgres setup

```
postgres=# create role kharcha_user login password '<password>';
postgres=# create database kharcha owner kharcha_user;
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
