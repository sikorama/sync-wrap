import { test } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { readFileSync, rmSync, existsSync } from "node:fs";

const OUT = "build/sync-wrap.bas";

test("the build produces a non-empty .bas with a valid +3DOS header", () => {
  rmSync(OUT, { force: true });
  execSync("npm run build --silent", { stdio: "pipe" });

  assert.ok(existsSync(OUT), `${OUT} was not produced`);
  const bytes = readFileSync(OUT);

  // +3DOS header is 128 bytes, followed by at least one byte of program.
  assert.ok(bytes.length > 128, "file has no program after the header");

  // Signature.
  assert.equal(bytes.subarray(0, 8).toString("latin1"), "PLUS3DOS");
  assert.equal(bytes[8], 0x1a, "missing soft-EOF byte");

  // Total file length (little-endian u32 at offset 11) matches the file.
  assert.equal(bytes.readUInt32LE(11), bytes.length);

  // Checksum: low 8 bits of the sum of the first 127 bytes, stored at 127.
  let sum = 0;
  for (let i = 0; i < 127; i++) sum += bytes[i];
  assert.equal(bytes[127], sum & 0xff, "header checksum is wrong");

  // Header type 0 = BASIC program.
  assert.equal(bytes[15], 0, "header type is not BASIC");
});
