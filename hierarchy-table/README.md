---
cli_help: |
  Plugin: hierarchy-table
  Description: Displays a Markdown table as a landscape presentation slide.

  Features:
    - Optimized for clear presentation of tabular data on a single slide.
    - Uses landscape orientation by default.
    - Customizable CSS for table and slide appearance.

  Expected Front Matter:
    - title: (string, optional) Title for the PDF document metadata.
    # pdf_options can be used here to override specific slide settings from hierarchy-table.config.yaml

  Configuration Notes (hierarchy-table.config.yaml):
    - css_files: Points to "hierarchy-table.css".
    - pdf_options: Defines landscape orientation, page size (e.g., Letter), and minimal margins.

  Example Usage:
    oshea convert my-table-slide.md --plugin hierarchy-table
---

# `hierarchy-table` Plugin

This plugin transforms a Markdown file containing a table (and optionally a title) into a PDF formatted as a presentation slide. It's ideal for sharing structured information like organizational charts, feature comparisons, or project hierarchies.

## Creating This Plugin: A Developer's Trace

This plugin was developed to showcase how `oshea` can be extended for specific presentation needs. Here's a conceptual trace of its creation:

1.  **Initialization (Conceptual `plugin create`):**
    The plugin structure was started (conceptually) using:
    ```bash
    # From within the main oshea repository:
    # oshea plugin create hierarchy-table --dir ../oshea-plugins
    ```
    This command (if run) would generate boilerplate files:
    * `hierarchy-table/hierarchy-table.config.yaml`
    * `hierarchy-table/index.js`
    * `hierarchy-table/hierarchy-table.css`
    * `hierarchy-table/README.md` (this file!)

2.  **Defining the Purpose:**
    The goal was clear: take a Markdown table and display it well on a single, landscape PDF page, resembling a presentation slide.

3.  **Crafting Example Content (`hierarchy-table-example.md`):**
    An example Markdown file was created, including a title (H1) and a Markdown table. This served as the primary input for testing.
    ```markdown
    ---
    title: "Project Team Hierarchy"
    ---

    # Project Team Responsibilities

    | Role          | Name         | Key Responsibilities                      | Reports To     |
    |---------------|--------------|-------------------------------------------|----------------|
    | Project Lead  | Dr. E. Vance | Overall project direction, Final approval | Steering Comm. |
    | ... (more rows) ... | ...          | ...                                       | ...            |
    ```

4.  **Configuring Plugin Behavior (`hierarchy-table.config.yaml`):**
    * `description` was updated.
    * `handler_script` was confirmed as `index.js` (to use `DefaultHandler`).
    * `css_files` was set to `["hierarchy-table.css"]`.
    * `pdf_options` were crucial:
        * `landscape: true`
        * `format: "Letter"` (or specific width/height for 16:9)
        * `margin`: Kept small (e.g., "0.5in") for maximum slide real estate.
        * `printBackground: true` to allow CSS background colors for the slide.
    * `inject_fm_title_as_h1: false` because the slide title comes from the Markdown content itself.

5.  **Styling the Slide and Table (`hierarchy-table.css`):**
    CSS was written to:
    * Set a basic slide background and default font sizes suitable for projection.
    * Style the H1 (if used in the Markdown for a slide title).
    * Extensively style the `<table>`, `<th>`, `<td>` elements for clarity, readability, and a professional appearance (borders, padding, header background, optional row striping).

6.  **Implementing the Handler (`index.js`):**
    For this plugin, the standard `DefaultHandler` (provided by `coreUtils` to the plugin constructor) is sufficient. It processes the Markdown (including the table) into HTML, and the CSS + PDF options handle the rest. The `index.js` remained the simple boilerplate that delegates to `DefaultHandler`.

7.  **Documentation (`README.md` and `cli_help`):**
    This README file was updated to explain the plugin's purpose, expected input, configuration, and provide usage examples. The `cli_help` front matter section was filled out for `oshea plugin help hierarchy-table`.

8.  **Testing and Iteration:**
    The plugin was tested by converting `hierarchy-table-example.md`:
    ```bash
    # Assuming 'hierarchy-table' is registered in a relevant oshea config.yaml
    oshea convert path/to/hierarchy-table-example.md --plugin hierarchy-table
    ```
    CSS and `pdf_options` were tweaked until the desired slide appearance was achieved.

## Usage

1.  **Create your Markdown file.** It should typically include:
    * An optional H1 heading for the slide title.
    * The main Markdown table.
    * Optionally, a brief concluding paragraph or caption.

    Example: See `hierarchy-table-example.md`.

2.  **Ensure the plugin is registered** in your `oshea` configuration (XDG or project-level `config.yaml`).
    Example registration:
    ```yaml
    # In your main config.yaml
    document_type_plugins:
      hierarchy-table: "/path/to/oshea-plugins/hierarchy-table/hierarchy-table.config.yaml"
    ```

3.  **Convert your file:**
    ```bash
    oshea convert your_slide_content.md --plugin hierarchy-table --outdir ./slides
    ```

## Customization

* Modify `hierarchy-table.css` to change the visual theme (colors, fonts, table styles).
* Override `pdf_options` in your Markdown file's front matter or in your XDG/project configuration for specific slide dimension or margin needs.
