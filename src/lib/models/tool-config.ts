import { PlatformValue } from '../util';
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

  mode: PlatformValue<InstallMode>;

  callback?: string;

  packageUrl?: string;
}
