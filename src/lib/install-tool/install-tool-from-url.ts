import os from 'os';
import path from 'path';
import { ToolInstallConfig } from '../models';
import { Processes } from './processes';
import { InstallStrategy } from './type';

export class InstallToolFromUrl implements InstallStrategy {
  public readonly name = 'fromUrl';

  async doInstall(name: string, tool: ToolInstallConfig): Promise<void> {
    if (process.platform !== 'linux') {
      throw new Error(
        `Install from url is not supported on platform ${process.platform}`
      );
    }
    if (!tool.packageUrl) {
      throw new Error(`Undefined packageUrl for ${name}`);
    }

    const downloadedPath = path.join(os.tmpdir(), `${name}-install`);
    const processes = new Processes(`Downloading ${name}`)
      .add('mkdir', ['-p', downloadedPath])
      .add('curl', ['-Lo', downloadedPath, tool.packageUrl]);

    const isZip = tool.packageUrl.endsWith('.zip');
    const isTarGz = tool.packageUrl.endsWith('.tar.gz');

    let tmpExecutablePath;
    if (isZip) {
      processes.add('unzip', ['-a', downloadedPath, '-d', os.tmpdir()]);
      tmpExecutablePath = path.join(os.tmpdir(), name);
    } else if (isTarGz) {
      tmpExecutablePath = path.join(os.tmpdir(), name);
      processes.add('tar', ['-zxvf', downloadedPath, '-C', tmpExecutablePath]);
    } else {
      tmpExecutablePath = downloadedPath;
    }

    // make it executable
    processes.add('chmod', ['+x', tmpExecutablePath]);

    // move to
    processes.add(
      'mv',
      [tmpExecutablePath, path.join('usr', 'local', 'bin', name)],
      true
    );

    // clean up
    processes.add('rm', ['-r', tmpExecutablePath]);
    if (isZip || isTarGz) {
      processes.add('rm', ['-r', downloadedPath]);
    }

    await processes.start();
  }
}
