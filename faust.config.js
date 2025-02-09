import { setConfig } from "@faustwp/core";
import templates from "./src/wp-templates";
let possibleTypes = {};
try {
  possibleTypes = require("./possibleTypes.json");
} catch (e) {
  console.warn("possibleTypes.json not found, will be generated on first run");
}

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  templates,
  possibleTypes,
  usePersistedQueries: true,
});
