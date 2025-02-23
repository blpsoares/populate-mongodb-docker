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

### Required tecnologies to run project (* is required and without * is optional)

- *Docker
- Bun
- Node

---

### Binary file to populate populatedb
This project has a binary file of the application, to add this bin how a command run:
`npm run cp:bin` or `bun cp:bin`
Or, in your shell
`cp ./bin/populatedb  ~/.local/bin`

### package.json scripts

```json
  "scripts": {
    "up:db": "docker run -d --name populate-fakedb -v mongo-data:/data/db -p 27017:27017 mongo",
    "populate": "bun ./src/app.ts",
    "down:db": "docker stop populate-fakedb",
    "rm:container": "docker rm -f populate-fakedb",
    "rm:volume": "docker volume rm -f populate-fakedb_mongo-data",
    "rm:all": "bun run rm:container && bun run rm:volume",
    "gen:bin": "bun build ./src/app.ts --compile --outfile ./bin/populatedb && chmod +x ./bin/populatedb",
    "cp:bin": "cp ./bin/populatedb  ~/.local/bin && echo 'ALREADY TO USE: populatedb'",
    "build:image": "docker build -t populate-fakedb",
    "create": "docker run -d --name populate-fakedb -v mongo-data:/data/db -p 27017:27017 populate-fakedb",
    "custom": "npm run build:image && npm run create:container && docker exec -it populate-fakedb bash"
  },

```

## Scripts description

#### `up:db`

- **Command**: `docker run -d --name populate-fakedb -v mongo-data:/data/db -p 27017:27017 mongo`
- **Description**: start docker container <populate-fakedb> in background with a mongo-data volume.

#### `populate`

- **Command**: `bun ./src/app.ts` >NEEDS BUN
- **Description**: Run core application (config.yml needs created in your current directory).

#### `down:db`

- **Command**: `docker stop populate-fakedb`
- **Description**: stop docker container <populate-fakedb>.

#### `rm:container`

- **Command**: `docker rm -f populate-fakedb`
- **Description**: remove docker container <populate-fakedb>

#### `rm:volume`

- **Command**: `docker volume rm -f populate-fakedb_mongo-data`
- **Description**: remove volume <mongo-data>

#### `rm:all`

- **Command**: `bun run rm:container && bun run rm:volume` >NEEDS BUN
- **Description**: remove volume and container <populate-fakedb> <mongo-data>.

#### `gen:bin`

- **Command**: `bun build ./src/app.ts --compile --outfile ./bin/populatedb && chmod +x ./bin/populatedb` >NEEDS BUN
- **Description**: Generate bin file of this project to runs `populatedb` command.

#### `cp:bin`

- **Command**: `cp ./bin/populatedb  ~/.local/bin && echo 'ALREADY TO USE: populatedb'`
- **Description**: Copy binary file to `~/.local/bin`.


---

# CONFIGS

This project have a config.yml and config.template.yml files in the source.
Modify the config.yml with your custom settings.

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

---

## BEFORE RUN ANY COMMAND, REMEMBER OF CREATE OR EDIT A config.yml FILE WITH YOUR CUSTOM CONFIGS

### Commands to run project

## OBSERVATION:

```bash
# if you do not have a mongouri and want create a local database, runs this command first (needs docker):
docker run -d --name populate-fakedb -v mongo-data:/data/db -p 27017:27017 mongo
```


## OPTION 1 - NEEDS BUN
```javascript
{
    "populate": "bun ./src/app.ts" #2°
}

```

## OPTION 2 - NEEDS NODE

```javascript
{
  "custom": "npm run build:image && npm run create:container && docker exec -it populate-fakedb bash"
}
# Now (after execution), you can execute node and bun commands inside of container
```
## OPTION 3 - NEEDS DOCKER

```bash
docker build -t populate-fakedb . &&
docker run -d --name populate-fakedb -v mongo-data:/data/db -p 27017:27017 populate-fakedb &&
docker exec -it populate-fakedb bash
# Now (after execution), you can execute node and bun commands inside of container

```

After populate the populate command, you can see this on your terminal:

```bash
simpleCollection1 | ※⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ | 1% | 6s | 10000/1000000
simpleCollection2 | ※⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ | 1% | 5s | 15000/1000000
simpleCollection3 | ※⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ | 2% | 5s | 25000/1000000
simpleCollection4 | ※⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ | 2% | 5s | 25000/1000000
complexCollection1 | ※⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ | 1% | 5s | 10000/1000000
complexCollection2 | ※⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍⁍ | 1% | 5s | 15000/1000000
```

<br>

To access database for mongosh: \
`docker exec -it populate-fakedb mongosh <your uri if database not is local>`

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



### Notes

simpleCollections collections do not have document sublevels, so in terms of storage they are smaller and simpler.

complexCollections
They have sublevels and end up being heavier and larger.

**Application and image version: 1.1.0**
