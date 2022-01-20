import { InstallMode } from './install-mode';

export class ToolInstallConfig {
  /**
   * default to 'latest'
   */
  version?: string;
  /**
   * default to all groups
   */
  groups?: string[];

  mode: InstallMode | { [os in NodeJS.Platform]?: InstallMode };

  callback?: string;

  packageUrl?: string;
}
