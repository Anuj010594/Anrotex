import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const files = [
  "aws-cost-review-worksheet.xlsx",
  "cicd-release-checklist.txt",
  "node-ci.yml",
  "lambda-rollback-tests.zip",
  "DOWNLOAD-TERMS.txt",
  "lambda-rollback/README.txt",
  "lambda-rollback/TERMS.txt",
  "lambda-rollback/release.py",
  "lambda-rollback/smoke.py",
  "lambda-rollback/test_release.py",
];

const lines = await Promise.all(files.map(async (file) => {
  const bytes = await readFile(new URL(`../public/downloads/${file}`, import.meta.url));
  return `${createHash("sha256").update(bytes).digest("hex")}  ${file}`;
}));
await writeFile(new URL("../public/downloads/SHA256SUMS.txt", import.meta.url), `${lines.join("\n")}\n`);
console.log(`Prepared fingerprints for ${files.length} download files.`);
