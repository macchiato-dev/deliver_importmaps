import type { PackageInfo } from "./get_package_info.ts";

interface SimpleImportMap {
  imports: { [key: string]: string };
}

export function generateImportMap(
  packages: { [key: string]: PackageInfo },
): SimpleImportMap {
  const imports = Object.fromEntries(
    Object.entries(packages).map(
      ([
        name,
        { version, module },
      ]) => [name, `https://cdn.jsdelivr.net/npm/${name}@${version}/${module}`],
    ),
  );
  return { imports };
}

export function generateTypedImports(
  packages: { [key: string]: PackageInfo },
): string {
  return Object.entries(packages).map(
    ([
      name,
      { version, module, types },
    ]) =>
      [
        `// @deno-types="https://cdn.jsdelivr.net/npm/${name}@${version}/${types}"`,
        `import "https://cdn.jsdelivr.net/npm/${name}@${version}/${module}";`,
      ].join("\n"),
  ).join("\n\n") + "\n";
}
