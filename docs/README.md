# Docusaurus AsciiDoc Example

This is a sample Docusaurus project configured to use the `@asciidoc-js/docusaurus-asciidoc` plugin.

## Getting Started

### Installation

First, install the dependencies:

```bash
npm install
```

### Development

To start the development server:

```bash
npm start
```

The site will be available at `http://localhost:3000`.

### Building

To build the project for production:

```bash
npm run build
```

The static files will be generated in the `build/` directory.

## Project Structure

```
.
├── docs/                    # Documentation source files
│   ├── intro.adoc          # Introduction (AsciiDoc)
│   ├── asciidoc-guide.adoc # AsciiDoc syntax guide
│   ├── markdown-example.md # Markdown example
│   └── examples/           # Example files
│       ├── code-blocks.adoc
│       └── lists-and-tables.adoc
├── src/
│   ├── css/               # Custom CSS
│   ├── pages/             # React pages
│   └── components/        # React components
├── static/                # Static assets
├── package.json
├── docusaurus.config.js   # Docusaurus main config
└── sidebars.js           # Sidebar navigation config
```

## Features

This example demonstrates:

- **AsciiDoc Support**: Full support for `.adoc` files alongside Markdown
- **Markdown Compatibility**: Traditional Markdown still works perfectly
- **Code Highlighting**: Syntax highlighting for multiple languages
- **Tables & Lists**: Advanced table and list formatting
- **Responsive Design**: Mobile-friendly layout

## Configuration

The plugin is configured in `docusaurus.config.js`:

```javascript
plugins: [
  '@asciidoc-js/docusaurus-asciidoc',
],

presets: [
  ['classic', {
    docs: {
      include: ['**/*.{md,mdx,adoc}'],
    },
  }],
],
```

## Using AsciiDoc

Create `.adoc` files in the `docs/` directory. Example:

```asciidoc
---
title: My Document
description: A description
---

= My Document

This is AsciiDoc content.

== Section

Some text here.

[source,javascript]
----
console.log('Hello, World!');
----
```

## Deployment

To deploy to GitHub Pages or another hosting service:

```bash
npm run build
```

Then serve the `build/` directory.

## Learn More

- [Docusaurus Documentation](https://docusaurus.io/)
- [AsciiDoc Language Docs](https://docs.asciidoctor.org/asciidoc/latest/)
- [Plugin Repository](https://github.com/asciidoc-js/docusaurus-asciidoc)
