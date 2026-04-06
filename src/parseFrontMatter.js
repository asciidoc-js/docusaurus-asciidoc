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
 * for author / revision info (via `@asciidoc-js/reasciidoc`) and, if present,
 * injects a `last_update` object that Docusaurus renders as
 * "Last updated by … on …".
 */

// Lazy-loaded to avoid top-level ESM import (Docusaurus config is loaded
// via jiti/CJS, but @asciidoc-js/reasciidoc is ESM-only).
let _fromAsciidoc;
async function getFromAsciidoc() {
  if (!_fromAsciidoc) {
    const mod = await import('@asciidoc-js/reasciidoc');
    _fromAsciidoc = mod.fromAsciidoc;
  }
  return _fromAsciidoc;
}

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
      // `result.content` is the file body after the YAML block has been
      // stripped by the default parser.
      const fromAsciidoc = await getFromAsciidoc();
      const asciiTree = fromAsciidoc(result.content);
      const lastUpdate = buildLastUpdate(asciiTree);
      if (lastUpdate) {
        result.frontMatter.last_update = lastUpdate;
      }
    } catch {
      // If AsciiDoc parsing fails here we silently skip — the real error
      // will surface during the webpack build when the loader runs.
    }

    return result;
  };
}
