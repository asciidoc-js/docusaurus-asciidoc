/**
 * Custom `parseFrontMatter` wrapper for Docusaurus that enriches AsciiDoc
 * front matter with `last_update` derived from the AsciiDoc document header
 * (author line + revision line).
 *
 * Usage in `docusaurus.config.js`:
 *
 *   import { createParseFrontMatter } from 'docusaurus-plugin-asciidoc/parseFrontMatter';
 *
 *   export default {
 *     markdown: {
 *       parseFrontMatter: createParseFrontMatter(),
 *     },
 *     ...
 *   };
 *
 * When Docusaurus reads a `.adoc` file, the default parser extracts the YAML
 * front-matter block.  This wrapper then inspects the remaining AsciiDoc body
 * for author / revision info (via `@asciidoc-js/adast-util-from-asciidoc`) and, if present,
 * injects a `last_update` object that Docusaurus renders as
 * "Last updated by … on …".
 */

// Import the registry utilities to access pre-parsed adast trees
import { getOrParse } from './registry.js';
import { fromAsciidoc } from '@asciidoc-js/adast-util-from-asciidoc';

/**
 * Build a Docusaurus `last_update` front-matter object from an adast
 * Document node.
 *
 * @param {{ data?: { authors?: Array<{name: string}>, revdate?: string } }} tree
 * @returns {{ author?: string, date?: string } | undefined}
 */
function buildLastUpdate(tree) {
  const authors = tree.data?.authors;
  const revdate = tree.data?.revdate;

  if (!authors?.length && !revdate) return undefined;

  const lastUpdate = {};
  if (authors?.length) {
    lastUpdate.author = authors.map((a) => a.name).join(', ');
  }
  if (revdate) {
    lastUpdate.date = revdate;
  }
  return lastUpdate;
}

/**
 * Create a `parseFrontMatter` function suitable for
 * `siteConfig.markdown.parseFrontMatter`.
 *
 * @returns {(params: {filePath: string, fileContent: string, defaultParseFrontMatter: Function}) => Promise<{frontMatter: object, content: string}>}
 */
export function createParseFrontMatter() {
  return async (params) => {
    // Delegate to the built-in parser first.
    const result = await params.defaultParseFrontMatter(params);

    // Only enrich .adoc files that don't already have last_update.
    if (!params.filePath.endsWith('.adoc') || result.frontMatter.last_update) {
      return result;
    }

    try {
      // Get or parse the adast tree and cache it in the registry
      const adastTree = getOrParse(params.filePath, 'adastTree', result.content, fromAsciidoc);

      // Extract last_update metadata from adast
      const lastUpdate = buildLastUpdate(adastTree);
      if (lastUpdate) {
        result.frontMatter.last_update = lastUpdate;
      }
    } catch {
      // If something goes wrong, silently skip — the real error will
      // surface during the webpack build when the loader runs.
    }

    return result;
  };
}
