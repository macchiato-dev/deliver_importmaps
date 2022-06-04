import { getDependencies, generateImportMap, generateTypedImports } from "./mod.ts";
import { parse, Args } from "https://deno.land/std@0.140.0/flags/mod.ts";
import { unpack } from "https://deno.land/x/md_unpack_simple@0.0.3/mod.ts";
import { readAll } from "https://deno.land/std@0.140.0/streams/conversion.ts";
import * as JSONC from "https://deno.land/std@0.140.0/encoding/jsonc.ts";

const MISSING_DATA_MESSAGE = (
  'Expected valid JSON input or valid JSON code block named' +
  ' "dependencies.json"'
)

function stringToDep(s: string) {
  const i = s.lastIndexOf('@');
  return i === -1 ? [s, '*'] : [s.substring(0, i), s.substring(i + 1)];
}

async function getInputDependencies(flags: Args): Promise<{ [key: string]: string }> {
  if (flags._.length > 0) {
    return Object.fromEntries(flags._.map(s => stringToDep(s.toString())));
  } else {
    let text
    if ('input' in flags) {
      text = await Deno.readTextFile(flags.input.toString());
    } else {
      text = new TextDecoder().decode(await readAll(Deno.stdin));
    }
    let input
    try {
      input = JSONC.parse(text);
    } catch (inputErr) {
      const unpackedData = await unpack(text);
      if (unpackedData && Object.keys(unpackedData).length > 0) {
        const codeBlockData = unpackedData['dependencies.json'];
        if (typeof codeBlockData === 'string') {
          input = JSONC.parse(codeBlockData);
        } else {
          throw new Error(MISSING_DATA_MESSAGE);
        }
      } else {
        if (/\s+[/{]/.test(text)) {
          throw inputErr;
        } else {
          throw new Error(MISSING_DATA_MESSAGE);
        }
      }
    }
    if (
      input !== null && typeof input === 'object' && !Array.isArray(input) &&
      Object.values(input).every(v => typeof v === 'string')
    ) {
      return input as { [key: string]: string }
    } else {
      throw new Error('Dependencies must a be map of strings')
    }
  }
}

export async function run(args: string[]) {
  const flags = parse(args);
  const inputDependencies = await getInputDependencies(flags);
  const dependencies = await getDependencies(inputDependencies);
  const importMap = generateImportMap(dependencies);
  const typedImports = generateTypedImports(dependencies);
  console.log(
`##### \`import_map.json\`

\`\`\`json
${JSON.stringify(importMap, null, 2)}
\`\`\`

##### \`typed_imports.ts\`

\`\`\`ts
${typedImports.trim()}
\`\`\`
`
  )
}

if (import.meta.main) {
  run(Deno.args);
}
