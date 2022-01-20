import chalk from 'chalk';
import figlet from 'figlet';
import inquirer = require('inquirer')
import { installTool } from '../install-tool';
import { Config } from '../models';
import {tools} from './questions/tools'
import {groups} from './questions/groups'

 export const ui = async (config: Config) => {

  process.stdout.write('\n');

  process.stdout.write(
    chalk.greenBright(
      figlet.textSync(`Welcome to ${config.companyName} !`, {
        horizontalLayout: 'default',
        verticalLayout: 'default',
      })
    )
  );

  process.stdout.write('\n');

  try {
    const groupsSelected = await inquirer.prompt(groups(config.groups))
    const toolsSelected = await inquirer.prompt(tools(config.tools, groupsSelected["groups"]))
    //@TODO: implement the installer
    console.log(toolsSelected)
  } catch(e) {
      console.error(e)
  }

  process.stdout.write('\n\n\n\n\n\n');
  process.stdout.write('\n');

  await installTool('serverless', config.tools['serverless'])

  return 0;
}
