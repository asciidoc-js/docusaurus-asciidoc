// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import {createParseFrontMatter} from '@asciidoc-js/docusaurus-asciidoc';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AsciiDoc Example',
  tagline: 'A sample Docusaurus project using AsciiDoc',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://asciidoc-js.github.io',
  baseUrl: '/docusaurus-asciidoc/',

  organizationName: 'asciidoc-js',
  projectName: 'docusaurus-asciidoc',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          include: ['**/*.{md,mdx,adoc}'],
          showLastUpdateAuthor: true,
          showLastUpdateTime: true
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: ['@asciidoc-js/docusaurus-asciidoc'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'AsciiDoc Example',
        logo: {
          alt: 'Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          {
            href: 'https://github.com/asciidoc-js/docusaurus-asciidoc',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Getting Started',
                to: './docs/intro',
              },
              {
                label: 'AsciiDoc Guide',
                to: './docs/asciidoc-guide',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/asciidoc-js/docusaurus-asciidoc',
              },
              {
                label: 'AsciiDoc JS',
                href: 'https://github.com/asciidoc-js',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} AsciiDoc JS. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
