import { ToolInstallConfig } from '../models';
import { InstallStrategy } from './type';

export class InstallToolFromUrl implements InstallStrategy {
  public readonly name = 'fromUrl';

  async doInstall(name: string, tool: ToolInstallConfig): Promise<void> {
    console.log(`Installing package ${name} from url ${tool.packageUrl}`);
  }
}
