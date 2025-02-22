import fs from 'node:fs';
import yaml from 'js-yaml';
import { z } from 'zod';

const configSchema = z.object({
  dbName: z.string({ invalid_type_error: 'The dbName field should be a string', required_error: 'The dbName field is required' }),
  dbUri: z.string({ invalid_type_error: 'The dbUri field should be a string', required_error: 'The dbUri field is required' }),
  simpleCollections: z.array(z.string({
    invalid_type_error: 'The simpleCollections array should contain only strings',
  }), {required_error: 'The simpleCollections field is required'}),
  complexCollections: z.array(z.string({
    invalid_type_error: 'The complexCollections array should contain only strings',
  })).optional(),
  collectionSize: z.number({
    invalid_type_error: 'This field collectionSize should be a number',
    required_error: 'This field is required'
  }).min(1).default(1e4),
  batchSize: z.number({
    invalid_type_error: 'This field batchSize should be a number',
    required_error: 'This field batchSize is required'
  }).min(1).default(1100),
  concurrency: z.number().min(1).default(4),
});

export async function parseYamlToJson(filePath) {
  if (!fs.existsSync(filePath)) throw new Error(`File ${filePath} not found\nPlease, create config.yml file on the source of this project`);
  const fileContent = await fs.promises.readFile(filePath, 'utf8');
  const jsonData = yaml.load(fileContent);
  try {
    return configSchema.parse(jsonData);
  } catch (error) {
      if(error instanceof z.ZodError) {
        console.error('Error parsing config.yml file');
        throw error.errors
      // biome-ignore lint/style/noUselessElse: <explanation>
      } else{
        console.error('Unexpected error')
        throw error
      }
  }
}