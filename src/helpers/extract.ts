const extract = (
  obj: Record<string, unknown>,
  ...keys: string[]
): Record<string, unknown> =>
  Object.getOwnPropertyNames(obj)
    .filter((key) => keys.includes(key))
    .reduce((acc, key) => Object.assign(acc, { [key]: obj[key] }), {});

export default extract;
