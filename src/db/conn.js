import chalk from 'chalk';
import { MongoClient } from 'mongodb';

export const conn = async (URI) => {
  console.log(chalk.yellow.bold("[ Connecting to database ]", URI));
  const client = new MongoClient(URI);
  try {
    await client.connect();
    console.log(chalk.green.bold("[ Database connected ]"));
    return client;
  } catch (e) {
    throw `Error to connect to database: ${e}`;
  }
};
