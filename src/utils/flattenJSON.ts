// flattenedJSON will flatten an object to a single level of nesting,
// concatenating any tokens with hyphens between

// optionally pass a callback which will run on each final value
// callback has access to the final concatenated key

export default function flattenedJSON(
  rootObj: Object,
  callback: Function,
  keyPrefix: string
) {
  function flatten(acc: Object, object: Object, prev?: string) {
    Object.keys(object).forEach((key) => {
      const value = (object as any)[key];
      const newKey = prev ? `${prev}-${key}` : key;

      if (typeof value === "object" && Object.keys(value).length) {
        return flatten(acc, value, newKey);
      }

      let details;
      const objToStore = {
        value,
      };

      if (callback) {
        const result = callback({
          key: newKey,
          value,
        });
        details = result;
      }

      (acc as any)[newKey] = {
        ...objToStore,
        ...details,
      };

      return null;
    });

    return acc;
  }

  return Object.keys(rootObj).reduce((acc: Object, category: string) => {
    // Take each category and flatten its tokens separately
    const keyBeginning = `${keyPrefix || "$nebula"}-${category}`;

    (acc as any)[category] = flatten(
      {},
      {
        [keyBeginning]: (rootObj as any)[category],
      }
    );
    return acc;
  }, {});
}
