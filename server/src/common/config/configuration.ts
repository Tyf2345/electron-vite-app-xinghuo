import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = `.${process.env.NODE_RUNNING}.yaml`;

export const getConfig = (key?: string): Record<string, any> => {
  const resConfig = yaml.load(
    readFileSync(join(process.cwd(), '.config', YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;

  if (key) {
    return resConfig[key];
  }
  return resConfig;
};
