import { generateImportMap, generateTypedImports } from "./generate.ts";
import { assert, assertEquals } from "https://deno.land/std@0.133.0/testing/asserts.ts";

const packages = {
  "@codemirror/state": {
    name: "@codemirror/state",
    version: "0.19.9",
    module: "dist/index.js",
    types: "dist/index.d.ts",
    dependencies: { "@codemirror/text": "^0.19.0" },
  },
  "@codemirror/text": {
    name: "@codemirror/text",
    version: "0.19.6",
    module: "dist/index.js",
    types: "dist/index.d.ts",
    dependencies: {},
  },
};

Deno.test("generate import map", () => {
  const packageInfo = packages["@codemirror/text"];
  const result = generateImportMap({ "@codemirror/text": packageInfo });
  const url =
    "https://cdn.jsdelivr.net/npm/@codemirror/text@0.19.6/dist/index.js";
  assertEquals({ imports: { "@codemirror/text": url } }, result);
});

Deno.test("generate typed endpoints", () => {
  const text = generateTypedImports(packages);
  const match1 = /deno-types.*text.*"/.exec(text);
  assert(match1 && match1[0].endsWith("dist/index.d.ts\""));
  const match2 = /deno-types.*state.*"/.exec(text);
  assert(match2 && match2[0].endsWith("dist/index.d.ts\""));
});
