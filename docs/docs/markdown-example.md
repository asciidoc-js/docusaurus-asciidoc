---
sidebar_position: 3
title: Markdown Example
description: Example showing Markdown works alongside AsciiDoc
---

# Markdown Example

This page demonstrates that Markdown files work seamlessly alongside AsciiDoc files in the same Docusaurus project.

## Mixed Format Support

The `@asciidoc-js/docusaurus-asciidoc` plugin allows you to use:

- Traditional Markdown (`.md` files)
- MDX (`.mdx` files)
- AsciiDoc (`.adoc` files)

All in the same documentation project!

## Benefits

- **Choice**: Use whichever format you prefer
- **Migration**: Gradually migrate from Markdown to AsciiDoc
- **Zero Breaking Changes**: Existing Markdown still works perfectly
- **Team Flexibility**: Let team members use their preferred format

## Syntax Comparison

### Headings

```markdown
# Heading 1
## Heading 2
```

vs AsciiDoc:

```asciidoc
= Document Title
== Heading 1
=== Heading 2
```

### Bold and Italics

```markdown
**bold** and _italic_
```

vs AsciiDoc:

```asciidoc
*bold* and _italic_
```

## Next Steps

- Explore the [AsciiDoc Guide](asciidoc-guide.adoc)
- Check out the [Code Blocks Example](examples/code-blocks.adoc)
- View the [Lists and Tables Example](examples/lists-and-tables.adoc)
