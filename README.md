# deliver_importmaps

[![pipeline status](https://gitlab.com/ResourcesCo/macchiato/deliver_importmaps/badges/main/pipeline.svg)](https://gitlab.com/ResourcesCo/macchiato/deliver_importmaps/-/commits/main)

This is a tool for generating an import map for loading JavaScript modules
straight from the source inside of npm packages, delivered by the
[jsDelivr CDN][jsd].

## Usage

```ts
import {
  generateImportMap,
  generateTypedImports,
  getDependencies,
} from "https://deno.land/x/deliver_importmaps@0.0.2/mod.ts";
const dependencies = await getDependencies({ "style-mod": "*" });
const importMap = generateImportMap(dependencies);
const typedImports = generateTypedImports(dependencies);
console.log({ importMap, typedImports });
```

This permission is needed:

```
--allow-net=data.jsdelivr.com,cdn.jsdelivr.net
```

## Command

To install, run:

```
deno install --allow-net=data.jsdelivr.com,cdn.jsdelivr.net \
  https://deno.land/x/deliver_importmaps@0.0.2/main.ts
```

This will install it as `deliver_importmaps`.

To run, create a Markdown file with a code block in it that has a list
of packages and version numbers in a code block called `dependencies.json`
and pipe it into the command:

```
cat input.md | deliver_importmaps
```

The output will contain a code block that has an import map and another
with the types for creating a file. They can be put into files using
[md_unpack_simple][md_unpack_simple]:

```
cat input.md | deliver_importmaps | md_unpack_simple
```

## Source

This is generated from a markdown document, [deliver_importmaps.md][src], using
[md_unpack_simple][md_unpack_simple].

## License

MIT

[jsd]: https://jsdelivr.net/
[src]: https://github.com/ResourcesCo/macchiato/blob/main/build/deno/deliver_importmaps.md
[md_unpack_simple]: https://deno.land/x/md_unpack_simple
