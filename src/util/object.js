module.exports.objectWithoutProperties = objectWithoutProperties;
module.exports.hasOwnProperty = hasOwnProperty;

/**
 *
 * @param {T} obj
 * @param {Array<string>} keys
 * @returns
 */
function objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

function hasOwnProperty(objRef, key) {
  return Object.prototype.hasOwnProperty.call(objRef, key);
}
