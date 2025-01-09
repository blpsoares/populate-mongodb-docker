# POPULATE MONGO DATABASE WITH FAKE DATA (to tests)

Project structure

```bash
.
├── node_modules
├── src
│   ├── services
│   │   ├── populate.js
│   │   ├── insert-documents.js
│   │   └── generate-documents.js
│   ├── db
│   │   └── conn.js
│   └── app.js
├── package.json
├── jsconfig.json
├── docker-compose.yml
├── bun.lockb
├── README.md
└── Dockerfile

3 directories, 11 files
```

---

### Required tecnologies to run project

- Docker

---

### package.json scripts

```json
  "scripts": {
    "populate": "bun src/app.js",
    "up:db": "docker-compose up --build -d",
    "down:db": "docker-compose down",
    "clean:container": "docker rm -f $(docker ps -a -q) && docker rmi -f populate-mongodb-docker_populate-fakedb",
    "clean:volume": "docker volume rm -f populate-mongodb-docker_mongo-data",
    "clean:all":"bun run clean:container && bun run clean:volume"
  },

```

## Scripts description

#### `populate`

- **Command**: `bun src/app.js`
- **Description**: Runs `app.js` to populate MongoDB with options defined in the main scope.

#### `up:db`

- **Command**: `docker-compose up --build -d`
- **Description**: Builds and starts Docker containers in the background.

#### `down:db`

- **Command**: `docker-compose down`
- **Description**: Stops and removes all Docker containers, networks, and volumes.

#### `clean:container`

- **Command**: `docker rm -f $(docker ps -a -q) && docker rmi -f populate-mongodb-docker_populate-fakedb`
- **Description**: Forcefully removes all stopped containers and a specific Docker image.

#### `clean:volume`

- **Command**: `docker volume rm -f populate-mongodb-docker_mongo-data`
- **Description**: Forcefully removes the MongoDB data volume.

#### `clean:all`

- **Command**: `bun run clean:container && bun run clean:volume`
- **Description**: Removes all stopped containers, a specific Docker image, and the MongoDB data volume.

---

### Commands to run project

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

2. Exec `docker exec -it mongo-fakedb bun src/app.js` //COPY THIS COMMAND AND PASTE O YOUR SHELL

After execute the populate command, you can see this on your terminal:

```bash
⬢ docker exec -it mongo-fakedb bun src/app.js

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
`docker exec -it mongo-fakedb mongosh` || `docker exec -it mongo-fakedb mongosh mongodb://localhost:27017/<yourDatabaseName>>`

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

You can edit options on src>app.js

```javascript
const db = client.db("myDB"); // Your database name

const options = {
  simpleCollections: simpleCollections, // Array to generate simple collections
  complexCollections: complexCollections, // Array to generate complex collections
  collectionSize: 1e6, // Quantity documents for each collection
  batchSize: 5000, // Batch size to insert documents on db
  db, // Database variable
  concurrence: 2 // Max concurrence promises 
};
```

### Notes

simpleCollections collections do not have document sublevels, so in terms of storage they are smaller and simpler.

complexCollections
They have sublevels and end up being heavier and larger.

TODO:

- Change options object to ENVIRONMENT variables on docker-compose.yml
- Change database name on app.js to ENVIRONMENT variable on docker-compose.yml

**Application and image version: 1.0.0**
