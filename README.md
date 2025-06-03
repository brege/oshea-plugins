# Community and Example Plugins for `md-to-pdf`

This repository hosts a collection of community-contributed and advanced example plugins designed to extend the functionality of the [md-to-pdf](https://github.com/brege/md-to-pdf) utility. These plugins showcase various capabilities, from custom layouts to dynamic data visualizations.

## Current Plugins

This collection currently includes the following plugins:

* **`advanced-card-red/`**: An example business card plugin featuring a vibrant red theme and dynamic QR code generation.
* **`d3-histogram-slide/`**: A plugin for generating presentation-style slides that embed interactive D3.js histograms and render LaTeX math equations.
* **`hierarchy-table/`**: A plugin for displaying hierarchical data in a formatted table, useful for organizational charts or nested data structures.

## How to Use These Plugins with `md-to-pdf`

Using plugins from this collection is straightforward with `md-to-pdf`'s built-in collection management commands.

### 1. Add the Collection

To make these plugins available to your `md-to-pdf` installation, simply add this repository as a plugin collection:

```bash
md-to-pdf collection add https://github.com/brege/md-to-pdf-plugins.git
```

This command will download the collection and register its plugins for use with your `md-to-pdf` installation.

### 2. Discover and Explore Plugins

Once the collection is added, you can list all available plugins and get detailed help for specific ones:

  * **List All Plugins (including this collection's):**

    ```bash
    md-to-pdf plugin list
    ```

  * **Get Detailed Help for a Plugin:**

    ```bash
    md-to-pdf plugin help advanced-card-red
    md-to-pdf plugin help d3-histogram-slide
    ```

### 3. Convert Documents Using a Plugin

After adding the collection, you can use any of its plugins with the `md-to-pdf convert` or `generate` commands.

  * **Example: Convert an Advanced Business Card:**
    Assuming you have the example Markdown file for `advanced-card-red` (e.g., `advanced-card-red-example.md` from this repository), you can convert it using:

    ```bash
    md-to-pdf convert advanced-card-red-example.md --plugin advanced-card-red
    ```

  * **Example: Generate a D3 Histogram Slide:**
    Similarly, for the D3 histogram slide:

    ```bash
    md-to-pdf convert d3-histogram-slide-example.md --plugin d3-histogram-slide
    ```

---

For more comprehensive details on `md-to-pdf` usage, plugin development, and configuration, please refer to the main [md-to-pdf documentation](https://github.com/brege/md-to-pdf#readme).

