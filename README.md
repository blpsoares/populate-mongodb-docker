# POPULATE MONGO DATABASE WITH FAKE DATA (to tests)

Project structure

```bash
.
├── node_modules
├── bin
│   └── populatedb
├── src
│   ├── db
│   │   └── conn.ts
│   ├── functions
│   │   ├── generate-documents.ts
│   │   ├── insert-documents.ts
│   │   ├── parseYml.ts
│   │   └── populate.ts
│   ├── types
│   │   └── index.ts
│   └── app.ts
├── Dockerfile
├── README.md
├── bun.lockb
├── config.yml
├── docker-compose.yml
├── package-lock.json
├── package.json
└── tsconfig.json

5 directories, 16 files
```

---

### Required tecnologies to run project

- Docker

---

### Binary file to populate populatedb
This project has a binary file of the application, to add this bin how a command run:
`npm run cp:bin` or `bun cp:bin`
Or, in your shell
`cp ./bin/populatedb  ~/.local/bin`

### package.json scripts

```json
  "scripts": {
    "populate": "docker exec -it populate-fakedb bun src/app.js",
    "up:db": "docker-compose up --build -d",
    "down:db": "docker-compose down",
    "clean:container": "docker rm -f $(docker ps -a -q) && docker rmi -f populate-mongodb-docker_fake-db",
    "clean:volume": "docker volume rm -f populate-mongodb-docker_mongo-data",
    "clean:all": "bun run clean:container && bun run clean:volume",
    "gen:bin": "bun build ./src/app.ts --compile --outfile ./bin/populatedb && chmod +x ./bin/populatedb",
    "cp:bin": "cp ./bin/populatedb  ~/.local/bin && echo 'ALREADY TO USE: populatedb'",
    "run": "docker run -d --name database -p 27017:27017 mongo && cp ./bin/populatedb  ~/.local/bin && populatedb"
  },

```

## Scripts description

#### `up:db`

- **Command**: `docker run -d --name populate-fakedb -v mongo-data:/data/db -p 27017:27017 mongo`
- **Description**: start docker container <populate-fakedb> in background with a mongo-data volume.

#### `down:db`

- **Command**: `docker stop populate-fakedb`
- **Description**: stop docker container <populate-fakedb>.

#### `rm:container`

- **Command**: `docker rm -f populate-fakedb`
- **Description**: remove docker container <populate-fakedb>

#### `rm:volume`

- **Command**: `docker volume rm -f populate-mongodb-docker_mongo-data`
- **Description**: remove volume <mongo-data>

#### `rm:all`

- **Command**: `npm run clean:container && bun run clean:volume`
- **Description**: remove volume and container <populate-fakedb> <mongo-data>.

#### `gen:bin`

- **Command**: `bun build ./src/app.ts --compile --outfile ./bin/populatedb && chmod +x ./bin/populatedb`
- **Description**: Generate bin file of this project to runs `populatedb` command.

#### `cp:bin`

- **Command**: `cp ./bin/populatedb  ~/.local/bin && echo 'ALREADY TO USE: populatedb'`
- **Description**: Copy binary file to `~/.local/bin`.

#### `populate`

- **Command**: `npm run up:db && npm run cp:bin`
- **Description**: Create a docker container and run populatedb bin (config.yml needs created in your current directory).

---

### Commands to run project

## OPTION 1 - FAST OPTION
```javascript
// RUNS WITH BINARY AND NEW LOCAL DATABASE
{
    "populate": "npm run up:db && cp ./bin/populatedb  ~/.local/bin && populatedb"
}

```

## OPTION 2 - NEED DOCKER COMPOSE - THIS OPTION IS RECOMMENDED IF YOU WANT TO KEEP CONTAINER DATA


```javascript
{
    "up:db": "docker-compose up --build -d"
}

// first, you need run the up container command
// If you have nodejs or bun installed on your machine, only run `bun up:db` or `npm run up:db`
// Else, run manually docker-compose up --build -d

```

After up container with our custom image, you have two options:

1. Run `bun populate` or `npm run populate` (remeber, you only run this command case you have bun or node on your machine)

OR

2. Exec `docker exec -it populate-fakedb bun src/app.js`

After populate the populate command, you can see this on your terminal:

```bash
⬢ docker exec -it populate-fakedb bun src/app.js

$ bun src/app.js

simpleCollection1 | ※⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ | 1% | 6s | 10000/1000000
simpleCollection2 | ※⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ | 1% | 5s | 15000/1000000
simpleCollection3 | ※⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ | 2% | 5s | 25000/1000000
simpleCollection4 | ※⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ | 2% | 5s | 25000/1000000
complexCollection1 | ※⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ | 1% | 5s | 10000/1000000
complexCollection2 | ※⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ | 1% | 5s | 15000/1000000
```

<br>

To access database for mongosh: \
`docker exec -it populate-fakedb mongosh` || `docker exec -it populate-fakedb mongosh mongodb://localhost:27017/<yourDatabaseName>>`

```bash
test> show dbs
admin    40.00 KiB
myDB    2.86 GiB
config  108.00 KiB
local    40.00 KiB
test>
```

URI to connect on mongosh:

`"mongodb://localhost:27017/<database_name>"`

**<database_name>** is optional, you can use only `mongodb://localhost:27017`

If you want change:

- quantity collections (and your names)
- quantity documents for each collection
- batch size to insert documents on db
- database name

You can edit options on config.yml file on source of this project

```YAML
dbUri: "mongodb://localhost:27017" # Your MongoDB connection string
dbName: 'dbTeste' # Database name
simpleCollections: # Array with some collection names. (This field is required)
  - "simpleCollection"
complexCollections: # Array with some collection names. (This field is not required)
  - "complexCollection"
  - "complexCollection2"
collectionSize: 1e4 # Quantity of documents for each collection
batchSize: 100 # Batch size for each document recording batch
concurrency: 10 # Number of concurrency async operations

# Required field:
#   - dbUri
#   - dbName
#   - simpleCollections

# Default values in not required fields
#   - collectionSize = 1e4 (10.000)
#   - batchSize = 1100
#   - concurrency = 4


```

### Notes

simpleCollections collections do not have document sublevels, so in terms of storage they are smaller and simpler.

complexCollections
They have sublevels and end up being heavier and larger.

**Application and image version: 1.1.0**
