import type { Db } from "mongodb";

export type Options = {
  simpleCollections: string[];
  complexCollections?: string[];
  collectionSize: number;
  batchSize: number;
  db: Db;
  concurrency: number;
}