# @asciidoc-js/docusaurus-asciidoc

A Docusaurus plugin that enables AsciiDoc (.adoc) files in docs and blog content directories.

## Description

This plugin allows you to write documentation in AsciiDoc format (.adoc files) within your Docusaurus project. It seamlessly integrates with Docusaurus's existing MDX pipeline, providing native support for AsciiDoc syntax while maintaining all Docusaurus features like theming, plugins, and routing.

## Features

- **Native AsciiDoc Support**: Write documentation using AsciiDoc syntax
- **Seamless Integration**: Works with existing Docusaurus themes and plugins
- **Performance Optimized**: Avoids markdown serialization round-trips
- **Front Matter Support**: Supports YAML front matter in AsciiDoc files
- **Table of Contents**: Automatic TOC generation from AsciiDoc headings

## Installation

Install the plugin using npm:

```bash
npm install @asciidoc-js/docusaurus-asciidoc
```

Or using yarn:

```bash
yarn add @asciidoc-js/docusaurus-asciidoc
```

## Usage

### Basic Setup

Add the plugin to your `docusaurus.config.js`:

```javascript
module.exports = {
  plugins: ['@asciidoc-js/docusaurus-asciidoc'],
  presets: [
    ['classic', {
      docs: {
        include: ['**/*.{md,mdx,adoc}'],
      },
    }],
  ],
};
```

### Configuration

The plugin supports the following configuration options (passed as the second argument to the plugin function):

```javascript
plugins: [
  ['@asciidoc-js/docusaurus-asciidoc', {
    // Plugin options (if any)
  }],
],
```

### Writing AsciiDoc Files

Create `.adoc` files in your `docs/` or `blog/` directories. The plugin will automatically process them alongside your existing `.md` and `.mdx` files.

Example AsciiDoc file (`docs/example.adoc`):

```asciidoc
---
title: Example Document
description: An example AsciiDoc document
---

= Example Document

This is an AsciiDoc document.

== Section

Some content here.

* List item 1
* List item 2

[source,javascript]
----
console.log('Hello, world!');
----
```

## Architecture

The plugin uses a sophisticated architecture to integrate AsciiDoc with Docusaurus:

1. **Webpack Loader**: Parses `.adoc` files to AST and stores in a shared registry
2. **Remark Plugin**: Injects the parsed AST into the MDX pipeline
3. **MDX Integration**: Leverages Docusaurus's existing MDX processing for theming and plugins

This approach ensures optimal performance and compatibility with Docusaurus features.

## Requirements

- Docusaurus 3.0.0 or later
- Node.js 16 or later

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT