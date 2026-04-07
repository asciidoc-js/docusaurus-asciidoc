/**
 * Webpack loader that converts AsciiDoc (.adoc) source into an mdast tree
 * and stores it in a shared registry.
 *
 * Pipeline (inside the loader):
 *   AsciiDoc text → adast (via @asciidoc-js/adast-util-from-asciidoc) → mdast (via adast-mdast)
 *
 * The loader returns only the YAML front-matter (if present) as valid
 * markdown.  The MDX parser will parse this into a near-empty tree, and
 * our remark plugin (remarkAsciidocInject) will replace that tree with
 * the real mdast tree from the registry — avoiding any markdown
 * serialization round-trip.
 */

import { fromAsciidoc } from '@asciidoc-js/adast-util-from-asciidoc';
import { toMdast } from '@asciidoc-js/adast-util-to-mdast';
import { mdastRegistry } from './registry.js';

const FRONT_MATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

/**
 * Separate YAML front-matter from the AsciiDoc body.
 */
function splitFrontMatter(source) {
  const match = FRONT_MATTER_RE.exec(source);
  if (match) {
    return {
      frontMatter: match[0].trimEnd() + '\n',
      body: source.slice(match[0].length),
    };
  }
  return { frontMatter: '', body: source };
}

export default function asciidocLoader(source) {
  const { frontMatter, body } = splitFrontMatter(source);

  // Parse AsciiDoc → adast → mdast
  const asciiTree = fromAsciidoc(body);
  const mdastTree = toMdast(asciiTree);

  // Store the tree for the remark plugin to pick up
  mdastRegistry.set(this.resourcePath, mdastTree);

  // Return only the front-matter.  The MDX parser will produce a
  // near-empty tree from this; our remark plugin replaces it.
  return frontMatter + '\n';
}
