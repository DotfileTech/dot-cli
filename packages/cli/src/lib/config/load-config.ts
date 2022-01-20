import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import { plainToInstance } from 'class-transformer';
import { Config } from '../models/';
import { join } from 'path';

export const CONFIG_FILE_NAME = 'dot-cli.yaml';

export async function loadConfig(): Promise<Config> {
  const path = join(process.cwd(), CONFIG_FILE_NAME);

  const configString = await readFile(path, { encoding: 'utf-8' });

  const configObject = parse(configString);

  const configInstance = plainToInstance(Config, configObject);

  return configInstance;
}
