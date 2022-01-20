import { ToolInstallConfig } from '../models';
import { InstallStrategy } from './type';

export class InstallToolNpmOrYarn implements InstallStrategy {
  constructor(public readonly name: 'yarn' | 'npm') {}

  async doInstall(name: string, tool: ToolInstallConfig): Promise<void> {
    console.log(`Installing package ${name} using ${name}`);
  }
}
