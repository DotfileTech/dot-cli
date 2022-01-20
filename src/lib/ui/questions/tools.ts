import { Config } from '../../models';

type Choices = {
  checked: boolean;
  name: string;
  value: string;
}[]

export const tools = (tools: Config['tools'], groupsSelected: Config['groups']) => {
  if (!groupsSelected) return;

  const filteredGroups = (tools) => {
    let result: Choices  = [];
    for (var k in tools) {
      const isIncluded = !tools[k].groups.every(group => !groupsSelected.includes(group))
      if (isIncluded) {
         result.push({
          checked: true,
          name: `Install ${k}`,
          value: k,
        })
      }
    }
    return result;
  };

  return {
    type: 'checkbox',
    name: 'tools',
    message: 'By default all packages are selected but you can deselect them if necessary',
    choices: filteredGroups(tools)
  };
};
