import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Config } from '../models';

export const DEFAULT_VERSION = 'latest';

export function expandConfig(config: Config): Config {
  // clone deep the config
  const configToExpand = plainToInstance(Config, instanceToPlain(config));

  Object.values(configToExpand.tools).forEach((tool) => {
    // set version to latest when unspecified
    if (!tool.version) tool.version = DEFAULT_VERSION;

    // link to all groups when unspecified
    if (!tool.groups)
      tool.groups = configToExpand.groups ? [...configToExpand.groups] : [];

    // fill packageUrl template
    if (tool.packageUrl) {
      tool.packageUrl = fillTemplate(tool.packageUrl, tool);
    }
  });

  return configToExpand;
}

function fillTemplate(templateString, templateVars) {
  // this replace variables in a es6 template literal
  // for instance fillTemplate(`my name is ${name}`, {name: 'Joe'})
  // returns 'my name is Joe'
  // from https://stackoverflow.com/a/55594573
  return templateString.replace(/\${(.*?)}/g, (x, g) => templateVars[g]);
}
