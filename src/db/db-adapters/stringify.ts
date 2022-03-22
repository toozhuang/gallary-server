/**
 * 返回一个 JSON String
 * @param obj
 * @constructor
 */
function Stringify(obj) {
  return JSON.stringify(obj, null, 2);
}
export default Stringify;
