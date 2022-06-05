const baseUrl = "https://data.jsdelivr.com/v1";
const headers = {
  Accept: "application/json",
  "User-Agent": "Macchiato https://github.com/macchiato-dev/deliver_importmaps",
};

function splitPackageName(name: string): string[] {
  const pos = name.indexOf("/");
  if (pos === -1) {
    return [name];
  } else {
    return [name.substring(0, pos), name.substring(pos + 1)];
  }
}

export async function getVersion(
  name: string,
  versionRange = "*",
): Promise<string> {
  const urlName = splitPackageName(name).map((s) => encodeURI(s)).join("/");
  const urlVersionRange = encodeURI(versionRange);
  const url = `${baseUrl}/package/resolve/npm/${urlName}@${urlVersionRange}`;
  const resp = await fetch(url, {headers});
  if (resp.ok) {
    const respBody = await resp.json() as { version: string };
    const version = respBody.version;
    return version;
  } else {
    throw new Error(`Fetch error: ${resp.statusText}`);
  }
}
