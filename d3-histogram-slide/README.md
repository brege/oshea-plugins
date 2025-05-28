---
cli_help: |
  Plugin: d3-histogram-slide
  Description: Generates a PDF slide featuring a D3.js histogram in one column and Markdown content (including KaTeX math equations) in another column.

  Features:
    - Renders a D3.js histogram on the slide.
    - Displays Markdown content, including support for KaTeX for mathematical equations.
    - Arranges content in a two-column layout with a title area.
    - Allows for custom CSS styling.
    - Configurable PDF output options (e.g., page size, margins).
    - Uses D3.js v7 for histogram generation.

  Expected Front Matter:
    - title: (string) The title of the slide, which will be displayed in an H1 tag.
    - md_to_pdf_plugin: (string) Should be set to "d3-histogram-slide" to invoke this plugin.

  Configuration Notes (d3-histogram-slide.config.yaml):
    - css_files: Point to your custom CSS.
    - pdf_options: Adjust page size, margins, etc.
    - math: Enable or disable KaTeX math rendering (e.g., `enabled: true`).

  Example Usage:
    md-to-pdf convert document.md --plugin d3-histogram-slide
---

# d3-histogram-slide Plugin

This plugin generates a PDF slide that prominently features a D3.js-generated histogram alongside custom Markdown content. The slide is structured with a main title, followed by a two-column layout where the histogram occupies one column (typically the left) and the processed Markdown content (which can include complex mathematical equations rendered with KaTeX) occupies the other.
