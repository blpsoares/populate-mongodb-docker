export const insertDocuments = async (collectionName, documentGeneratorFn, options, multiBar) => {
  const collectionSize = options.collectionSize ?? 1e6;
  const batchSize = options.batchSize ?? 1000;
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