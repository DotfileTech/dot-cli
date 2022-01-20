import chalk from 'chalk';
import { Config } from '../../models';

type Choices = {
  checked: boolean;
  name: string;
  value: string;
}[];

export const tools = (
  tools: Config['tools'],
  groupsSelected: Config['groups']
) => {
  if (!groupsSelected) return;

  const filteredGroups = (tools) => {
    const result: Choices = [];
    for (let k in tools) {
      const isIncluded = !tools[k].groups.every(
        (group) => !groupsSelected.includes(group)
      );
      const groups = tools[k].groups
        .filter((group) => groupsSelected.includes(group))
        .join(', ');
      if (isIncluded) {
        result.push({
          checked: true,
          name: `Install ${k} - ${chalk.dim(groups)}`,
          value: k,
        });
      }
    }
    return result;
  };

  return {
    type: 'checkbox',
    name: 'tools',
    message:
      'By default all packages are selected but you can unselect them if necessary',
    choices: filteredGroups(tools),
  };
};
