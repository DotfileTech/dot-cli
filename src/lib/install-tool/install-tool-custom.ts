import { ToolInstallConfig } from '../models';
import { InstallStrategy } from './type';

export class InstallToolCustom implements InstallStrategy {
  public readonly name = 'custom';

  async doInstall(name: string, tool: ToolInstallConfig): Promise<void> {
    console.log(`Installing ${name} from custom script ${tool.callback}`);
  }
}
