import { createHash } from "node:crypto";
import { lstat, readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

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

const directory = new URL("../public/downloads/", import.meta.url);
const allowed = new Set([...files, "SHA256SUMS.txt"]);
async function checkDirectory(prefix = "") {
  const path = fileURLToPath(new URL(prefix || "./", directory)).replace(/[\\/]$/, "");
  if (!(await lstat(path)).isDirectory()) {
    throw new Error(`Download directory must not be a symbolic link: ${prefix}`);
  }
  for (const entry of await readdir(new URL(prefix || "./", directory), { withFileTypes: true })) {
    const name = prefix + entry.name;
    if (entry.isDirectory() && files.some((file) => file.startsWith(`${name}/`))) {
      await checkDirectory(`${name}/`);
    } else if (!entry.isFile() || !allowed.has(name)) {
      throw new Error(`Unreviewed file or symbolic link in downloads: ${name}`);
    }
  }
}
await checkDirectory();

// Build a small, uncompressed ZIP from explicit source files, with fixed metadata.
// No archive supplied separately can add hidden files or fall behind the source.
function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

const localEntries = [];
const centralEntries = [];
let offset = 0;
const archiveFiles = files.filter((file) => file.startsWith("lambda-rollback/"));
for (const file of archiveFiles) {
  const name = Buffer.from(file);
  const bytes = await readFile(new URL(file, directory));
  const checksum = crc32(bytes);
  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4);
  local.writeUInt16LE(0x21, 12); // 1 January 1980, for reproducible archives.
  local.writeUInt32LE(checksum, 14);
  local.writeUInt32LE(bytes.length, 18);
  local.writeUInt32LE(bytes.length, 22);
  local.writeUInt16LE(name.length, 26);
  localEntries.push(local, name, bytes);
  const central = Buffer.alloc(46);
  central.writeUInt32LE(0x02014b50, 0);
  central.writeUInt16LE((3 << 8) | 20, 4);
  central.writeUInt16LE(20, 6);
  central.writeUInt16LE(0x21, 14);
  central.writeUInt32LE(checksum, 16);
  central.writeUInt32LE(bytes.length, 20);
  central.writeUInt32LE(bytes.length, 24);
  central.writeUInt16LE(name.length, 28);
  central.writeUInt32LE((0o100644 << 16) >>> 0, 38);
  central.writeUInt32LE(offset, 42);
  centralEntries.push(central, name);
  offset += local.length + name.length + bytes.length;
}
const centralDirectory = Buffer.concat(centralEntries);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(archiveFiles.length, 8);
end.writeUInt16LE(archiveFiles.length, 10);
end.writeUInt32LE(centralDirectory.length, 12);
end.writeUInt32LE(offset, 16);
await writeFile(new URL("lambda-rollback-tests.zip", directory), Buffer.concat([...localEntries, centralDirectory, end]));

const lines = await Promise.all(files.map(async (file) => {
  const bytes = await readFile(new URL(`../public/downloads/${file}`, import.meta.url));
  return `${createHash("sha256").update(bytes).digest("hex")}  ${file}`;
}));
await writeFile(new URL("../public/downloads/SHA256SUMS.txt", import.meta.url), `${lines.join("\n")}\n`);
console.log(`Prepared fingerprints for ${files.length} download files.`);
