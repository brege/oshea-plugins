---
cli_help: |
  Plugin: advanced-card-red (Example Showcase Plugin)
  Description: An advanced example plugin with a RED theme, demonstrating custom HTML generation and dynamic content.

  Features:
    - Generates a business card PDF with a custom layout and RED branding.
    - Reads main card content (name, title) directly from the Markdown body.
    - Uses front matter for auxiliary data (e.g., website URL for QR code, branding colors).
    - Dynamically generates a QR code image URL.
    - Bypasses DefaultHandler to construct its own HTML.

  Front Matter Fields (Examples):
    - website: (string) URL used for QR code if 'qr_data' is not set.
    - qr_data: (string) Specific data for the QR code (e.g., mailto link, vCard info).
    - brandingColor: (string) Hex color code for custom branding elements (e.g., a shade of red).

  Configuration Notes (advanced-card-red.config.yaml):
    - css_files: Specifies CSS for the custom HTML structure (e.g., "advanced-card-red.css").
    - pdf_options: Defines specific dimensions (width, height) for the card.
    - inject_fm_title_as_h1: false.
    - printBackground: true.

  Example Usage (assuming registered appropriately):
    md-to-pdf convert path/to/example.md --plugin advanced-card-red
---

# Advanced Card RED Plugin (`advanced-card-red`) - Showcase Example

This `advanced-card-red` plugin is a variation of the `advanced-card` example. It demonstrates the same advanced plugin capabilities but is styled with a **RED** theme.

It showcases how to:
1.  Read primary content directly from the Markdown body.
2.  Utilize front matter for supplementary data.
3.  Dynamically generate content (QR code).
4.  Construct custom HTML, bypassing `DefaultHandler`.
5.  Load its own specific CSS.
6.  Directly call the PDF generation utility.

This plugin serves as an educational example for developers, highlighting how a base plugin structure can be adapted for different visual themes or minor functional variations.
