export interface PackageInfo {
  name: string;
  version: string;
  module: string;
  types?: string;
  dependencies: { [key: string]: string };
}

export async function getPackageInfo(
  name: string,
  version: string,
): Promise<PackageInfo> {
  const url = `https://cdn.jsdelivr.net/npm/${name}@${version}/package.json`;
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`Error getting package.json for ${name}@${version}`);
  }
  const pkg = await resp.json();
  if (typeof pkg.name !== "string" || typeof pkg.version !== "string") {
    throw new Error(
      `Missing name or version in package.json for ${name}@${version}`,
    );
  }
  const module = (
    typeof pkg.module === "string" ? pkg.module : (
      pkg.type === "module"
        ? (typeof pkg.main === "string" ? pkg.main : "index.js")
        : undefined
    )
  );
  if (typeof module !== "string") {
    throw new Error(`Cannot resolve module for ${name}@${version}`);
  }
  if (typeof pkg.types !== "string" && pkg.types !== undefined) {
    throw new Error(`Invalid types in package.json for ${name}@${version}`);
  }
  const dependencies = (pkg.dependencies || {}) as { [key: string]: string };
  return {
    name: pkg.name,
    version: pkg.version,
    module: module,
    ...(pkg.types ? { types: pkg.types } : undefined),
    dependencies,
  };
}
