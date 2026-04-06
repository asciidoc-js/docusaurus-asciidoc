/**
 * @asciidoc-js/docusaurus-asciidoc
 *
 * A Docusaurus plugin that enables AsciiDoc (.adoc) files in docs and blog
 * content directories.
 *
 * Architecture:
 *   1. A webpack loader parses .adoc → adast → mdast and stores the tree
 *      in a shared in-memory registry.
 *   2. The file then passes through Docusaurus's standard MDX loader, which
 *      sees only the YAML front-matter.
 *   3. A remark plugin (injected into beforeDefaultRemarkPlugins) swaps the
 *      near-empty parsed tree with the real mdast from the registry.
 *   4. The rest of the MDX pipeline (TOC, headings, rehype, JSX compilation)
 *      runs on the real tree — no markdown serialization round-trip.
 *
 * Usage in docusaurus.config.js:
 *
 *   plugins: ['docusaurus-plugin-asciidoc'],
 *
 *   presets: [
 *     ['classic', {
 *       docs: { include: ['**\/*.{md,mdx,adoc}'] },
 *     }],
 *   ],
 */

import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import remarkAsciidocInject from './remark-plugin.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const loaderPath = resolve(__dirname, 'loader.js');

export default function pluginAsciidoc(_context, _options) {
  return {
    name: 'docusaurus-plugin-asciidoc',

    configureWebpack(config, _isServer, _utils) {
      // ---------------------------------------------------------------
      // 1. Find the existing MDX rule (.md / .mdx)
      // ---------------------------------------------------------------
      const mdxRule = config.module.rules.find(
        (rule) =>
          rule.test instanceof RegExp &&
          (rule.test.test('.mdx') || rule.test.test('.md'))
      );

      if (!mdxRule) {
        console.warn(
          '[docusaurus-plugin-asciidoc] Could not locate the MDX webpack rule. ' +
            '.adoc files will not be processed.'
        );
        return {};
      }

      // ---------------------------------------------------------------
      // 2. Clone the MDX loader chain for the .adoc rule and inject
      //    our remark plugin into the MDX loader's options.
      // ---------------------------------------------------------------
      const mdxLoaders = Array.isArray(mdxRule.use)
        ? mdxRule.use
        : mdxRule.use
          ? [mdxRule.use]
          : mdxRule.loader
            ? [{ loader: mdxRule.loader, options: mdxRule.options }]
            : [];

      const adocLoaders = mdxLoaders.map((entry) => {
        const loaderObj = typeof entry === 'string' ? { loader: entry } : { ...entry };

        // Identify the Docusaurus MDX loader by path
        const isDocusaurusMdxLoader =
          typeof loaderObj.loader === 'string' &&
          (loaderObj.loader.includes('@docusaurus/mdx-loader') ||
            loaderObj.loader.includes('mdx-loader'));

        if (isDocusaurusMdxLoader && loaderObj.options) {
          // Clone options and clear pre-built processors so the MDX loader
          // creates fresh ones that include our remark plugin.
          loaderObj.options = {
            ...loaderObj.options,
            processors: undefined,
            crossCompilerCache: undefined,
            beforeDefaultRemarkPlugins: [
              remarkAsciidocInject,
              ...(loaderObj.options.beforeDefaultRemarkPlugins ?? []),
            ],
          };
        }

        return loaderObj;
      });

      // ---------------------------------------------------------------
      // 3. Push the .adoc rule directly into the config so it's
      //    guaranteed to be present in the final webpack configuration.
      // ---------------------------------------------------------------
      config.module.rules.push({
        test: /\.adoc$/,
        use: [...adocLoaders, { loader: loaderPath }],
      });

      return {};
    },
  };
}
