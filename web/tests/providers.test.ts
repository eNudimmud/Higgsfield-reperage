import { test } from "node:test";
import assert from "node:assert/strict";

test("default provider is open; google needs flag AND key", async () => {
  delete process.env.NEXT_PUBLIC_MAP_PROVIDER; delete process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  const { getProvider } = await import("../src/providers/index.ts");
  assert.equal(getProvider().id, "open");
  process.env.NEXT_PUBLIC_MAP_PROVIDER = "google";
  assert.equal(getProvider().id, "open", "no key → stays open");
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY = "test";
  assert.equal(getProvider().id, "google");
});

test("Google imagery is never a generation reference", async () => {
  const { assertGenerationReference } = await import("../src/providers/index.ts");
  assert.throws(() => assertGenerationReference({ id: "x", lat: 0, lon: 0, url: "", author: "© Google", license: "© Google", usableAsGenerationReference: false }));
  assert.doesNotThrow(() => assertGenerationReference({ id: "y", lat: 0, lon: 0, url: "", author: "Ada", license: "CC BY-SA 4.0", usableAsGenerationReference: true }));
});
