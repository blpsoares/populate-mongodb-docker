import Bottleneck from "bottleneck";
import cliProgress from "cli-progress";
import {
  generateComplexDocument,
  generateSimpleDocument,
} from "./generate-documents.js";
import { insertDocuments } from "./insert-documents.js";
import type { Options } from "../types/index.js";
import chalk from "chalk";

export const populateDB = async (options: Options) => {
  let simpleCollectionsPromises: Promise<void>[] = []
  let complexCollectionsPromises: Promise<void>[] = [];
  const { simpleCollections, complexCollections, concurrency } = options;

  const limiter = new Bottleneck({
    maxConcurrent: concurrency ?? 3,
  });

  const multiBar = new cliProgress.MultiBar({
    format:
      chalk.white.bold("{collectionName} | {bar} | {percentage}% | {duration_formatted} | {value}/{total}"),
    barCompleteChar: "※",
    barIncompleteChar: "⁍",
  });

  if (simpleCollections) {
    simpleCollectionsPromises = simpleCollections.map((collectionName) => {
      return limiter.schedule(() =>
        insertDocuments(
          collectionName,
          generateSimpleDocument,
          options,
          multiBar
        )
      );
    });
  }

  if (complexCollections) {
    complexCollectionsPromises = complexCollections.map((collectionName) => {
      return limiter.schedule(() =>
        insertDocuments(
          collectionName,
          generateComplexDocument,
          options,
          multiBar
        )
      );
    });
  }

  await Promise.all([
    ...simpleCollectionsPromises,
    ...complexCollectionsPromises,
  ]);
  multiBar.stop();
  console.log(chalk.bold.greenBright("\n[ Database ] Population completed!"));
};
