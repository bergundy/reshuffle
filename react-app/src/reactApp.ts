#!/usr/bin/env node
/* eslint-disable no-console */

import {
  sanityCheck,
  setupProxy,
  installPackages,
  ignoreReshuffle,
} from './steps';

const steps: Array<(() => Promise<string>) | (() => string) | (() => void)> = [
  sanityCheck,
  setupProxy,
  installPackages,
  ignoreReshuffle,
];

async function reactApp() {
  try {
    for (const step of steps) {
      const msg = await step();
      if (msg !== undefined) {
        console.log(msg);
      }
    }
  } catch (e) {
    console.error('ABORTED:', e.message);
    process.exit(1);
  }
}

// all promises handled by process.exit(1)
void reactApp();
