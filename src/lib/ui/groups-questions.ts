import { Config } from "../models";

export const groups = (groups: Config["groups"]) => {

  if(!groups) return

  return {
    type: 'checkbox',
    name: 'groups',
    message: 'What tools do you need ?',
    choices: groups.map((g) => ({
        checked: true,
        name: g,
        value: g
        ,
    }))
  }

}