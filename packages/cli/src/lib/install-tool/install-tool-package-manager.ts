import { ToolInstallConfig } from '../models';
import { InstallStrategy } from './type';

export class InstallToolPackageManager implements InstallStrategy {
  public readonly name = 'packageManager';

  async doInstall(name: string, tool: ToolInstallConfig): Promise<void> {
    console.log(`Installing package ${name} at version ${tool.version}`);
  }
}
