import { copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import type { Plugin } from "vite";

// Adds the Cloudflare-compatible worker entry point required by Sites while
// preserving the existing Vite SPA build and its current hosting behavior.
export function staticWorker(): Plugin {
  let root = process.cwd();

  return {
    name: "anrotex-static-worker",
    apply: "build",
    configResolved(config) {
      root = config.root;
    },
    async closeBundle() {
      const serverDirectory = resolve(root, "dist", "server");
      await mkdir(serverDirectory, { recursive: true });
      await copyFile(
        resolve(root, "worker", "index.js"),
        resolve(serverDirectory, "index.js"),
      );
    },
  };
}
