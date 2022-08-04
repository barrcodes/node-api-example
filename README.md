# node-api-example

A node API example for a tech screening

## Prerequisites

- Install node
- Install docker
- Install docker-compose
- Install postgres cli

## Database Setup

### Environment

To reduce hassle, I included the environment `.env` file. For security reasons, I would not include this file in a real project.

The contents of my environment, for easy reference in further sections:

```
PORT=60078
PGUSER=myapiuser
PGPASSWORD=12345
PGHOST=127.0.0.1
PGPORT=25580
PGDB=notes
```

### Initializing the docker image

On Mac / Linux / WSL:

```bash
sh start-db.sh
```

Or Manually:

```bash
sudo docker compose -f ./db/docker-compose-postgres.yml --env-file ./.env up
```

### Initialize the postgres database:

On Mac / Linux / WSL:

```bash
sh create-db.sh
```

Or Manually (sql files are located in [./db](https://github.com/barrcodes/node-api-example/tree/main/db)):

```bash
psql -h '127.0.0.1' -p 25580 -U myapiuser -W -f [/absolute/path/to/db/create-db.sql]
```

```bash
psql -h '127.0.0.1' -p 25580 -U myapiuser -W -f [/absolute/path/to/db/create-tables.sql] -d notes
```

## Project Setup

### Install dependencies

```bash
npm i
```

### Run the application

```bash
npm start
```

### Run Unit Tests

Tests can be found in `./tests`, and tests can be run with

```bash
npm test
```

### Optional Environment Variables

`ALLOW_LIST=origin1,origin2`: A list of CORS allowed orgins. However, running the application locally will not trigger this logic, as origin will be undefined. Unit tests for these cases have been written.

## Example curl Requests

### POST note

```bash
curl -H "Authorization: Bearer token1" -H "Content-Type: application/json" -X POST -d '{"title": "tile1", "contents": "some text"}' 127.0.0.1:60078/notes
```

```bash
curl -H "Authorization: Bearer token1" -H "Content-Type: application/json" -X POST -d '{"title": "tile2", "contents": "some text"}' 127.0.0.1:60078/notes
```

```bash
curl -H "Authorization: Bearer token2" -H "Content-Type: application/json" -X POST -d '{"title": "tile3", "contents": "some text"}' 127.0.0.1:60078/notes
```

```bash
curl -H "Authorization: Bearer token2" -H "Content-Type: application/json" -X POST -d '{"title": "tile4", "contents": "some text"}' 127.0.0.1:60078/notes
```

### GET notes

```bash
curl -H "Authorization: Bearer token1" -X GET 127.0.0.1:60078/notes
```

```bash
curl -H "Authorization: Bearer token2" -X GET 127.0.0.1:60078/notes
```

### GET note

```bash
curl -H "Authorization: Bearer token1" -X GET 127.0.0.1:60078/notes/1
```

```bash
curl -H "Authorization: Bearer token2" -X GET 127.0.0.1:60078/notes/3
```

### PATCH note

```bash
curl -H "Authorization: Bearer token1" -H "Content-Type: application/json" -X PATCH -d '{"title": "new title", "contents": "new text"}' 127.0.0.1:60078/notes/1
```

### DELETE note

```bash
curl -H "Authorization: Bearer token1" -X DELETE 127.0.0.1:60078/notes/1
```
