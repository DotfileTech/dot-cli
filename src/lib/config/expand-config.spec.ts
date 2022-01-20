import { expandConfig } from "./expand-config";
import { Config } from "../models";

describe("expand-config", () => {
  it("should set unspecified version to 'latest'", () => {
    const myConfig: Partial<Config> = {
      groups: ["dev"],
      tools: { test: { mode: "custom" } },
    };
    expect(expandConfig(myConfig as Config).tools.test.version).toEqual(
      "latest"
    );
  });

  it("should set unspecified group to all groups", () => {
    const myConfig: Partial<Config> = {
      groups: ["dev"],
      tools: { test: { mode: "custom" } },
    };
    expect(expandConfig(myConfig as Config).tools.test.groups).toEqual(["dev"]);
  });

  it("should set unspecified group to none when no groups are defined", () => {
    const myConfig: Partial<Config> = {
      tools: { test: { mode: "custom" } },
    };
    expect(expandConfig(myConfig as Config).tools.test.groups).toEqual([]);
  });

  it("should fill template in packageUrl", () => {
    const myConfig: Partial<Config> = {
      tools: {
        test: {
          version: "1.2.3",
          mode: "fromUrl",
          packageUrl: "http://example.com?${version}",
        },
      },
    };
    expect(expandConfig(myConfig as Config).tools.test.packageUrl).toEqual(
      "http://example.com?1.2.3"
    );
  });
});
