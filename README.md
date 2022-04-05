# deliver_importmaps

This is a tool for generating an import map for loading JavaScript modules straight
from the source inside of npm packages, delivered by the [jsDelivr CDN][jsd].

## Source

This is generated from a markdown document, [deliver_importmaps.md][src], using
[md_unpack_simple][md_unpack_simple].

## License

MIT

## TODO

- Get `package.json` from jsDelivr CDN for packages
- Recursively get dependencies, with `version`, `module` and `types` from `package.json`
- Generate imports for import maps
- Provide a script for running it from the command line
- Provide directions for using it programatically
- Provide a way to import the types

[jsd]: https://jsdelivr.net/
[src]: https://github.com/ResourcesCo/macchiato/blob/main/build/deno/deliver_importmaps.md
[md_unpack_simple]: https://deno.land/x/md_unpack_simple
