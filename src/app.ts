import chalk from "chalk";
import { conn } from "./db/conn.js";
import { parseYamlToJson } from "./functions/parseYml.js";
import { populateDB } from "./functions/populate.js";

(async () => {
  const {
    batchSize,
    collectionSize,
    concurrency,
    dbName,
    dbUri,
    simpleCollections,
    complexCollections,
  } = await parseYamlToJson("config.yml");

  const client = await conn(dbUri);
  const db = client.db(dbName);

  const options = {
    simpleCollections,
    complexCollections,
    collectionSize,
    batchSize,
    db,
    concurrency,
  };

  console.info(chalk.gray.bold("\nStarting to populate the database with the following options"));
  console.info(chalk.bold.dim("| DB URI: "), chalk.dim(dbUri));
  console.info(chalk.bold.dim("| DB Name: "), chalk.dim(dbName));
  console.info(chalk.bold.dim("| Batch Size: "), chalk.dim(batchSize));
  console.info(chalk.bold.dim("| Collection Size: "), chalk.dim(collectionSize));
  console.info(chalk.bold.dim("| Concurrency: "), chalk.dim(concurrency));
  console.info(chalk.bold.dim("| Simple Collections: "), chalk.dim(simpleCollections));
  console.info(chalk.bold.dim("| Complex Collections: "), chalk.dim(complexCollections), '\n');
  console.info(chalk.whiteBright("Population in progress..."))

  const start = Date.now();
  await populateDB(options);
  const end = Date.now();
  client.close();

  console.info(chalk.bold.greenBright("[ Database ] Connection to the database closed."));
  console.info(chalk.bold.gray("\nDatabase population time: "), chalk.bold.dim(`${(end - start) / 1000}s`));

})();
