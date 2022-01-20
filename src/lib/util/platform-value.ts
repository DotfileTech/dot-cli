export type PlatformValue<V> = V | { [platform in NodeJS.Platform]?: V };

export function getPlatformValue<V>(value: PlatformValue<V>): V {
  if (
    typeof value === 'object' &&
    value &&
    Object.prototype.hasOwnProperty.call(value, process.platform)
  ) {
    return value[process.platform];
  }
  return value as V;
}
