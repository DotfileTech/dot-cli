import { ToolInstallConfig } from './tool-config';

export class Config {
  companyName: string;
  groups?: string[];
  tools: { [toolName: string]: ToolInstallConfig };
}
