/**
 * Shared registry for passing mdast trees from the webpack loader
 * to the remark plugin without serializing to markdown.
 *
 * Uses globalThis to guarantee a single Map instance even when modules
 * are loaded through different resolution paths (ESM vs CJS, webpack
 * loader context vs plugin context).
 */

const REGISTRY_KEY = '__docusaurus_asciidoc_mdast_registry__';

if (!globalThis[REGISTRY_KEY]) {
  globalThis[REGISTRY_KEY] = new Map();
}

export const mdastRegistry = globalThis[REGISTRY_KEY];

/**
 * Get a property from the registry, or parse and cache it if not present.
 *
 * @param {string} filePath - The file path key in the registry
 * @param {string} property - The property name to get/store (e.g., 'adastTree', 'mdastTree')
 * @param {string} content - The content to parse if not in registry
 * @param {Function} parseFunction - The parser function to call if content not cached
 * @returns {*} The cached or newly parsed value
 */
export function getOrParse(filePath, property, content, parseFunction) {
  let stored = mdastRegistry.get(filePath);
  let value = stored?.[property];

  // If not in registry, parse and cache it
  if (value === undefined) {
    value = parseFunction(content);
    mdastRegistry.set(filePath, { ...stored, [property]: value });
  }

  return value;
}
