import { DEFAULT_VERSION } from '../config';
import { ToolInstallConfig } from '../models';
import { Processes } from './processes';
import { InstallStrategy } from './type';

export class InstallToolPackageManager implements InstallStrategy {
  public readonly name = 'packageManager';

  async doInstall(name: string, tool: ToolInstallConfig): Promise<void> {
    const isSpecifiVersion = tool.version !== DEFAULT_VERSION;
    const installed = await new Processes(`Detecting  ${name}`)
      .add(name, ['--version'])
      .start();

    if (installed === '') {
      const processRun = new Processes(`Installing ${name}`);
      
      switch (process.platform) {
        case "linux":
          await processRun.add("apt", [
            "install",
            isSpecifiVersion ? `${name}=${tool.version}` : name,
          ], true).start();
          break;
        case "darwin":
          await processRun.add("brew", [
            "install",
            isSpecifiVersion ? `${name}@${tool.version}` : name,
          ]).start();
          break;
        default:
          throw new Error(`Platform not supported: ${process.platform}`);
      }
    }
  }
}
