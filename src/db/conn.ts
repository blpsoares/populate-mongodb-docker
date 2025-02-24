import chalk from 'chalk';
import { MongoClient } from 'mongodb';

export const conn = async (URI: string) => {
  console.log(chalk.yellow.bold("[ Database ] Connecting to -> ", URI));
  const client = new MongoClient(URI);
  try {
    await client.connect();
    console.log(chalk.green.bold("[ Database ] Conected with successfully!"));
    return client;
  } catch (e) {
    throw `Error to connect to database: ${e}`;
  }
};