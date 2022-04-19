import { getDependencies } from "./get_dependencies.ts";
import { assertEquals } from "https://deno.land/std@0.133.0/testing/asserts.ts";

Deno.test("with dependencies", async () => {
  const packages = await getDependencies({ "@codemirror/state": "0.19.9" });
  console.log({ packages });
  assertEquals(Object.keys(packages).length, 2);
});

Deno.test("without dependencies", async () => {
  const packages = await getDependencies({ "style-mod": "4.0.0" });
  assertEquals(Object.keys(packages).length, 1);
});
