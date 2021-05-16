/**
 * Simple String.format() in javascript
 * @param fmt The given string need to format
 * @param args The value will be replaced in the the given string
 * @returns {*} The given string after replaced args
 *
 * @example format("Hello, {0}! The answer is {1}.", "World", 42);
 *          format("{{0}} will be replaced with {0}", 42);
 */
export const format = (fmt, ...args) => {
  if (!fmt.match(/^(?:(?:(?:[^{}]|(?:\{\{)|(?:\}\}))+)|(?:\{[0-9]+\}))+$/)) {
    throw new Error('invalid format string.');
  }
  return fmt.replace(
    /((?:[^{}]|(?:\{\{)|(?:\}\}))+)|(?:\{([0-9]+)\})/g,
    (m, str, index) => {
      if (str) {
        return str.replace(/(?:{{)|(?:}})/g, (m) => m[0]);
      } else {
        if (index >= args.length) {
          throw new Error('argument index is out of range in format');
        }
        return args[index];
      }
    },
  );
};

/**
 * Simple String.replace() in javascript
 * @param frm The given string need to format
 * @param pairs The pair<key, value> will be replaced in the the given string
 * @returns {*} The given string after replaced pairs
 *
 * @example replace("/api/user/{id}/profile", {id: 1});
 *          replace("/api/brands/{brand_id}/users/{user_id}", {brand_id: 1, user_id: 1});
 */
export const replace = (frm, pairs) => {
  let result = frm;
  for (let key in pairs) {
    result = result.replace('{' + key + '}', pairs[key]);
  }
  return result;
};
