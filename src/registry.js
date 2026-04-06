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
