import { getVersion } from "./get_version.ts";
import { assert } from "https://deno.land/std@0.133.0/testing/asserts.ts";

Deno.test("with organization", async () => {
  const version = await getVersion("style-mod");
  assert(/^\d+\./.test(version));
});

Deno.test("without organization", async () => {
  const version = await getVersion("@codemirror/view");
  assert(/^\d+\./.test(version));
});

Deno.test("with version", async () => {
  const version = await getVersion("@codemirror/view", "0.19.48");
  assert(version === "0.19.48");
});
