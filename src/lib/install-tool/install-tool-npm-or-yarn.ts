import { ToolInstallConfig } from '../models';
import { InstallStrategy } from './type';
import { Processes } from './processes';

export class InstallToolNpmOrYarn implements InstallStrategy {
  constructor(public readonly name: 'yarn' | 'npm') {}

  async doInstall(name: string, tool: ToolInstallConfig): Promise<void> {
    const installed = await new Processes(`Detecting  ${name}`)
      .add(name, ['--version'])
      .start();

    if (installed === '') {
      const processRun = new Processes(`Installing  ${name}`);

      switch (this.name) {
        case 'yarn': {
          await processRun.add('yarn', ['add', '-g', name]).start();
          break;
        }
        case 'npm': {
          await processRun.add('npm', ['install', '-g', name]).start();
          break;
        }
        default: {
          throw new Error(
            'Package Manager not handled, need to be yarn or npm'
          );
        }
      }
    }
  }
}
