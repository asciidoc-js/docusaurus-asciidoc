/**
 * Remark plugin that injects the pre-parsed mdast tree from the registry
 * and transforms AsciiDoc admonitions into Docusaurus admonitions.
 *
 * For .adoc files, the webpack loader already converted AsciiDoc → mdast
 * and stored the result.  This plugin replaces the (near-empty) tree that
 * the MDX parser produced from the stub front-matter with the real content.
 *
 * For non-.adoc files the registry has no entry, so this plugin is a no-op.
 */

import { mdastRegistry } from './registry.js';
import { visit } from 'unist-util-visit';

/** Admonition names that map directly to a Docusaurus admonition type. */
const ADMONITION_MAP = {
  note: 'note',
  tip: 'tip',
  important: 'important',
  warning: 'warning',
  caution: 'caution',
};

export default function remarkAsciidocInject() {
  return (tree, file) => {
    const filePath = file.path ?? file.history?.[0];
    if (!filePath) return;

    const mdastTree = mdastRegistry.get(filePath);
    if (!mdastTree) return;

    // Replace the tree content in-place
    tree.children = mdastTree.children;

    // Clean up the registry entry
    mdastRegistry.delete(filePath);

    // Convert raw-HTML nodes (from passthrough blocks) into MDX JSX elements
    // so the MDX compiler does not choke on unknown `raw` hast nodes.
    visit(tree, 'html', (node, index, parent) => {
      if (parent == null || index == null) return;
      const htmlStr = node.value;
      const exprValue = `{__html: ${JSON.stringify(htmlStr)}}`;
      parent.children[index] = {
        type: 'mdxJsxFlowElement',
        name: 'div',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'dangerouslySetInnerHTML',
            value: {
              type: 'mdxJsxAttributeValueExpression',
              value: exprValue,
              data: {
                estree: {
                  type: 'Program',
                  sourceType: 'module',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'ObjectExpression',
                        properties: [
                          {
                            type: 'Property',
                            key: { type: 'Identifier', name: '__html' },
                            value: { type: 'Literal', value: htmlStr, raw: JSON.stringify(htmlStr) },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
        children: [],
      };
    });

    // Transform admonition blockquotes into Docusaurus admonition nodes.
    // The adast-mdast converter produces blockquotes with
    //   data.asciiType === 'admonition'
    //   data.admonitionName === 'note' | 'tip' | 'warning' | ...
    // Docusaurus expects nodes with:
    //   data.hName === 'admonition'
    //   data.hProperties === { type: 'note', title?: '...' }
    visit(tree, 'blockquote', (node, index, parent) => {
      const asciiType = node.data?.asciiType;
      if (asciiType !== 'admonition') return;

      const name = node.data?.admonitionName ?? 'note';
      const type = ADMONITION_MAP[name] ?? 'note';

      // The first child is a <strong>LABEL</strong> paragraph added by
      // adast-mdast — remove it since Docusaurus renders its own title.
      const children = [...node.children];
      if (
        children.length > 0 &&
        children[0].type === 'paragraph' &&
        children[0].children?.length === 1 &&
        children[0].children[0].type === 'strong'
      ) {
        children.shift();
      }

      // Mutate in-place to the shape Docusaurus's admonition renderer expects
      node.type = 'admonition';
      node.data = {
        hName: 'admonition',
        hProperties: {
          type,
          title: type.charAt(0).toUpperCase() + type.slice(1),
        },
      };
      node.children = children;
    });
  };
}
