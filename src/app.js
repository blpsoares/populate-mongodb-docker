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

  console.info(chalk.blueBright.bold("Starting to populate the database with the following options:"));
  console.log(chalk.bold.yellow("DB URI: "), chalk.yellowBright(dbUri));
  console.log(chalk.bold.yellow("DB Name: "), chalk.yellowBright(dbName));
  console.log(chalk.bold.yellow("Batch Size: "), chalk.yellowBright(batchSize));
  console.log(chalk.bold.yellow("Collection Size: "), chalk.yellowBright(collectionSize));
  console.log(chalk.bold.yellow("Concurrency: "), chalk.yellowBright(concurrency));
  console.log(chalk.bold.yellow("Simple Collections: "), chalk.yellowBright(simpleCollections));
  console.log(chalk.bold.yellow("Complex Collections: "), chalk.yellowBright(complexCollections));

  await populateDB(options);
  client.close();
})();
