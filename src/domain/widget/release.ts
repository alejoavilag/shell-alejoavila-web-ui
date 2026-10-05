export type WidgetRelease = {
  name: string;
  version: string;
  entry: string;
  integrity: string;
  bytes: number;
  element: string;
  framework: string;
};

const INTEGRITY = /^sha(256|384|512)-[A-Za-z0-9+/]{32,}={0,2}$/;
const VERSION = /^\d+\.\d+\.\d+$/;
const ELEMENT = /^[a-z][a-z0-9]*(-[a-z0-9]+)+$/;

export function hasVerifiableDigest(release: WidgetRelease): boolean {
  return INTEGRITY.test(release.integrity);
}

export function isWellFormed(release: WidgetRelease): boolean {
  return (
    VERSION.test(release.version) &&
    ELEMENT.test(release.element) &&
    release.bytes > 0 &&
    hasVerifiableDigest(release)
  );
}

export function entryUrl(origin: string, release: WidgetRelease): string {
  const url = new URL(release.entry, origin);

  if (url.origin !== new URL(origin).origin) {
    throw new Error("The manifest points outside the widget origin");
  }

  return url.toString();
}

export function shortDigest(release: WidgetRelease): string {
  const [algorithm, digest = ""] = release.integrity.split("-");
  return `${algorithm}-${digest.slice(0, 12)}…`;
}
