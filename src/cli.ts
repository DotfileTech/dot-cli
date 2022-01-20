#!/usr/bin/env node

// import { expandConfig, loadConfig } from "./lib/config";
import { installTool } from './lib/install-tool';
// import { ui } from "./lib/ui";

// const start = async () => {
//   const config = await loadConfig();
//   await ui(expandConfig(config));
//   return;
// };

// start().then(() => true)
installTool('kubectl', {
  version: '3.5.4',
  mode: { linux: 'fromUrl' },
  packageUrl: 'https://dl.k8s.io/release/v1.21.1/bin/linux/amd64/kubectl',
}).then(console.log, console.error);

// installTool("helm", {
//   version: "3.5.4",
//   mode: { linux: "fromUrl" },
//   packageUrl: "https://get.helm.sh/helm-v3.5.4-linux-amd64.tar.gz",
// }).then(console.log, console.error);
