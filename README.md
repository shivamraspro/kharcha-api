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

## Environment variables
```bash
$ cp .env.example .env

# generate jwt-secret
$ openssl rand -base64 64
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

## Directory Structure

```
src/
│
├── main.ts                      # Application entry point
├── app.module.ts                # Root module
├── app.controller.ts            # Optional root-level controller
├── app.service.ts               # Optional root-level service
│
├── common/                      # Shared utilities and global concerns
│   ├── decorators/              # Custom decorators
│   ├── filters/                 # Exception filters
│   ├── guards/                  # Auth & permission guards
│   ├── interceptors/            # Transform/Logging interceptors
│   ├── middleware/              # Global middleware
│   ├── pipes/                   # Validation pipes
│   ├── utils/                   # Utility functions/helpers
│   └── constants/               # App-wide constants/enums
│
├── config/                      # Centralized config
│   ├── app.config.ts            # App-specific settings
│   ├── database.config.ts       # DB config
│   └── ...
│
├── modules/                     # Feature modules (vertical slicing)
│   ├── auth/
│   │   ├── dto/                 # Data transfer objects
│   │   ├── entities/            # Database entities/models
│   │   ├── strategies/          # Passport strategies (JWT, Google, etc.)
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── ...
│   │
│   ├── users/
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   └── ...
│   │
│   └── ... (other feature modules)
│
├── database/                    # DB migrations & seeds
│   ├── migrations/
│   ├── seeds/
│   └── index.ts
│
├── jobs/                        # Bull/Queue jobs or scheduled tasks
│
├── scripts/                     # One-off scripts
│
└── tests/                       # Unit/E2E tests
    ├── e2e/
    └── unit/

```
