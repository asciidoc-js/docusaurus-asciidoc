import {themes as prismThemes} from 'prism-react-renderer';

const config = {
  title: 'AsciiDoc Example',
  tagline: 'A sample Docusaurus project using AsciiDoc',
  favicon: 'img/favicon.ico',

  url: 'https://asciidoc-js.github.io',
  baseUrl: '/docusaurus-asciidoc/',

  organizationName: 'asciidoc-js',
  projectName: 'docusaurus-asciidoc',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/asciidoc-js/docusaurus-asciidoc/tree/main/docs',
          include: ['**/*.{md,mdx,adoc}'],
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/asciidoc-js/docusaurus-asciidoc/tree/main/docs',
          include: ['**/*.{md,mdx,adoc}'],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  plugins: [
    '@asciidoc-js/docusaurus-asciidoc',
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
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
          label: 'Docs',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left'
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
              to: '/docs/intro',
            },
            {
              label: 'AsciiDoc Guide',
              to: '/docs/asciidoc-guide',
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
  },
};

export default config;
