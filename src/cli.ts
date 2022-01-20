#!/usr/bin/env node

import { expandConfig, loadConfig } from './lib/config';
import { ui } from "./lib/ui";

const start = async () => {
    const config = await loadConfig();
    await ui(expandConfig(config))
    return
}
  
start().then(() => true)