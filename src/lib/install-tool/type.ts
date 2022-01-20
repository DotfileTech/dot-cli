import { InstallMode, ToolInstallConfig } from '../models';

export interface InstallStrategy {
  name: InstallMode;
  doInstall(name: string, tool: ToolInstallConfig): Promise<void>;
}
