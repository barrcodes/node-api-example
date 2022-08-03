# node-api-example

A node API example for a tech screening

## Prerequisites

- Install node
- Install docker
- Install docker-compose
- Maintenance of the database requires installing postgres, but code review should not require this

## Database Setup

- Create a file named `.env` in the root of the project (see "Environment Variables" for more details)
- Install docker and docker-compose
- Launch the postgres database from cli.
  - On mac/linux `sh start-db.sh`.
  - Otherwise, `sudo docker compose -f ./db/docker-compose-postgres.yml --env-file ./.env up`
- Initialize the postgres database from cli.
  - On mac/linux `sh create-db.sh`
  - Otherwise, `psql -h '127.0.0.1' -p [port] -U [user] -W -f [/absolute/path/to/db/init-db.sql]`

## Environment Variables

Create a file named `.env` in the root of the project, containing the following variables. You can use whatever values you wish. The .env is not stored on github as a security configuration, and in production the values would be stored in build variables of a CI/CD pipeline.

```
PGUSER=user
PGPASSWORD=password
PGPORT=5432
```

### Optional Environment Variables

If your system already has port 8080 bound, you can specify a port for the application inside the `.env` file using `PORT=[your port]`.

For production purposes, I added CORS logic which accepts a whitelist array of origins via `ALLOW_LIST=origin1,origin2`, however, running the application locally will not trigger this logic, as origin will be undefined. Unit tests for these cases have been written.

## Project Setup

- Install dependencies with `npm i`
- Run the application with `npm start`

## Unit Tests

Tests can be found in `./tests`, and tests can be run with `npm test`
