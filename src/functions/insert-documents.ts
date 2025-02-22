import type { MultiBar } from "cli-progress";
import type { Options } from "../types";

export const insertDocuments = async (
  collectionName: string,
  documentGeneratorFn: () => Record<string, unknown>,
  options: Options,
  multiBar: MultiBar
) => {
  const collectionSize = options.collectionSize;
  const batchSize = options.batchSize;
  const progressBar = multiBar.create(collectionSize, 0, { collectionName });
  const { db } = options;

  for (let i = 0; i < collectionSize; i += batchSize) {
    const batch = Array.from(
      { length: Math.min(batchSize, collectionSize - i) },
      documentGeneratorFn,
    );

    const bulkOperations = batch.map((document) => ({
      insertOne: { document },
    }));

    await db.collection(collectionName).bulkWrite(bulkOperations);

    progressBar.update(i + batch.length);
  }

  progressBar.stop();
};