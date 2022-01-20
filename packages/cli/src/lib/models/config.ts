import { ToolInstallConfig } from './tool-config';

export class Config {
  groups?: string[];

  tools: { [toolName: string]: ToolInstallConfig };
}
