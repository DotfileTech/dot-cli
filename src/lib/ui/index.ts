import chalk from 'chalk';
import figlet from 'figlet';
import inquirer = require('inquirer')
import { Config } from '../models';
import { questions } from './questions';

 export const ui = async (config: Config) => {

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
    await inquirer.prompt(questions(config))
  } catch(e) {
      console.error(e)
  }
  process.stdout.write('\n\n\n\n\n\n');
  process.stdout.write('\n');


  return ;
}