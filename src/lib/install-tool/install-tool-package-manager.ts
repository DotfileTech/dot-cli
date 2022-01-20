import * as aexec from "@actions/exec";
import { DEFAULT_VERSION } from "../config";
import { ToolInstallConfig } from "../models";
import { InstallStrategy } from "./type";

export class InstallToolPackageManager implements InstallStrategy {
  public readonly name = "packageManager";

  async doInstall(name: string, tool: ToolInstallConfig): Promise<void> {
    const isSpecifiVersion = tool.version !== DEFAULT_VERSION;
    switch (process.platform) {
      case "linux":
        await aexec.exec("apt", [
          "install",
          isSpecifiVersion ? `${name}=${tool.version}` : name,
        ]);
        break;
      case "darwin":
        await aexec.exec("brew", [
          "install",
          isSpecifiVersion ? `${name}@${tool.version}` : name,
        ]);
        break;
      default:
        throw new Error(`Platform not supported: ${process.platform}`);
    }
  }
}
