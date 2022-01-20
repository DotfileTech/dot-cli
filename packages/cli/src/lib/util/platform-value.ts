export type PlatformValue<V> = V | { [platform in NodeJS.Platform]?: V };

export function getPlatformValue<V>(v: PlatformValue<V>): V {
  if (process.platform in v) {
    return v[process.platform];
  }
  return v as V;
}
