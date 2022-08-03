# node-api-example

A node API example for a tech screening

## Prerequisites

- Install node
- Install docker
- Install docker-compose
- Install postgres cli
- Maintenance of the database requires installing postgres, but code review should not require this

## Database Setup

### Environment

Create a file named `.env` in the root of the project. You can use whatever values you wish. The .env is not stored on github as a security configuration, and in production the values would be stored in build variables of a CI/CD pipeline.

```
PGUSER=user
PGPASSWORD=password
PGHOST=127.0.0.1
PGPORT=5432
PGDB=dbname
```

### Initializing the docker image

- On mac/linux/wsl `sh start-db.sh`.
- Or, manually, `sudo docker compose -f ./db/docker-compose-postgres.yml --env-file ./.env up`

### Initialize the postgres database:

- On mac/linux/wsl you can simply run `sh create-db.sh`
- otherwise, you will need to create the db and table manually. Sql files are found in `./db/`

Manual commands (not necessary if you ran `create-db.sh`)

```
psql -h '127.0.0.1' -p [port] -U [user] -W -f [/absolute/path/to/db/create-db.sql]
psql -h '127.0.0.1' -p [port] -U [user] -W -f [/absolute/path/to/db/create-tables.sql] -d [dbname]
```

### Optional Environment Variables

If your system already has port 8080 bound, you can specify a port for the application inside the `.env` file using `PORT=[your port]`.

For production purposes, I added CORS logic which accepts a whitelist array of origins via `ALLOW_LIST=origin1,origin2`, however, running the application locally will not trigger this logic, as origin will be undefined. Unit tests for these cases have been written.

## Project Setup

- Install dependencies with `npm i`
- Run the application with `npm start`

## Unit Tests

Tests can be found in `./tests`, and tests can be run with `npm test`
