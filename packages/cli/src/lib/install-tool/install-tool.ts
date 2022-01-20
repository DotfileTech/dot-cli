import { InstallMode, ToolInstallConfig } from '../models';
import { getPlatformValue } from '../util';
import { InstallToolCustom } from './install-tool-custom';
import { InstallToolFromUrl } from './install-tool-from-url';
import { InstallToolNpmOrYarn } from './install-tool-npm-or-yarn';
import { InstallToolPackageManager } from './install-tool-package-manager';
import { InstallStrategy } from './type';

const strategyByMode: { [mode in InstallMode]: InstallStrategy } = {
  fromUrl: new InstallToolFromUrl(),
  packageManager: new InstallToolPackageManager(),
  custom: new InstallToolCustom(),
  npm: new InstallToolNpmOrYarn('npm'),
  yarn: new InstallToolNpmOrYarn('yarn'),
};

export async function installTool(
  name: string,
  tool: ToolInstallConfig
): Promise<void> {
  const resolvedMode = getPlatformValue(tool.mode);

  const strategy = strategyByMode[resolvedMode];

  await strategy.doInstall(name, tool);
}
