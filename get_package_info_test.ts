import { getPackageInfo } from "./get_package_info.ts";
import { assertEquals } from "https://deno.land/std@0.133.0/testing/asserts.ts";

Deno.test("with dependencies", async () => {
  const info = await getPackageInfo("@codemirror/state", "0.19.9");
  assertEquals(Object.keys(info.dependencies).length, 1);
});

Deno.test("without dependencies", async () => {
  const info = await getPackageInfo("style-mod", "4.0.0");
  assertEquals(info.dependencies, {});
});
