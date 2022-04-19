import { getVersion } from "./get_version.ts";
import { getPackageInfo, PackageInfo } from "./get_package_info.ts";

async function visitDependency(
  packages: { [key: string]: PackageInfo },
  name: string,
  versionRange: string,
): Promise<void> {
  const version = await getVersion(name, versionRange);
  const packageInfo = await getPackageInfo(name, version);
  packages[name] = packageInfo;
  for (
    const [depName, depVersion] of Object.entries(packageInfo.dependencies)
  ) {
    if (!packages[depName]) {
      await visitDependency(packages, depName, depVersion);
    }
  }
}

export async function getDependencies(
  dependencies: { [key: string]: string },
): Promise<{ [key: string]: PackageInfo }> {
  const packages = {};
  for (const [name, version] of Object.entries(dependencies)) {
    await visitDependency(packages, name, version);
  }
  return packages;
}
