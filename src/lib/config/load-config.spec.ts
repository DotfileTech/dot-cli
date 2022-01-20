import { readFileSync } from "fs";
import { join } from "path";
import { readFile } from "fs/promises";
import { CONFIG_FILE_NAME, loadConfig } from "./load-config";

jest.mock("fs/promises", () => ({
  readFile: jest.fn(),
  __esModule: true, // this property makes it work
}));

describe("loadConfig", () => {
  it("should read the config file", async () => {
    (readFile as unknown as jest.Mock).mockResolvedValue(``);

    await loadConfig();

    expect(readFile).toHaveBeenCalledWith(
      expect.stringMatching(new RegExp(`${CONFIG_FILE_NAME}$`)),
      expect.objectContaining({ encoding: "utf-8" })
    );
  });

  it("should parse the file into a raw config object", async () => {
    (readFile as unknown as jest.Mock).mockResolvedValue(
      readFileSync(join(__dirname, "test.yaml"), { encoding: "utf-8" })
    );

    const config = await loadConfig();

    expect(config.groups).toHaveLength(3);

    expect(config.tools).toMatchObject({
      nx: { mode: "yarn", groups: ["frontend", "backend"] },
      mkcert: {
        version: "1.4.3",
        mode: { darwin: "packageManager", linux: "fromUrl" },
        packageUrl:
          "https://github.com/FiloSottile/mkcert/releases/download/v${version}/mkcert-v${version}-linux-amd64",
      },
    });
  });
});
