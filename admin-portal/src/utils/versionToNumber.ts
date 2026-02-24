export default function versionToNumber(version: string): number {
  const [major, minor, patch] = version.split('.').map(Number);
  return major * 100 + minor * 10 + patch;
}
