# Community and Example Plugins for `oshea`

This repository hosts a collection of community-contributed and advanced example plugins designed to extend the functionality of the [oshea](https://github.com/brege/oshea) utility. These plugins showcase various capabilities, from custom layouts to dynamic data visualizations.

## Current Plugins

This collection currently includes the following plugins:

* **`advanced-card-red/`**: An example business card plugin featuring a vibrant red theme and dynamic QR code generation.
* **`d3-histogram-slide/`**: A plugin for generating presentation-style slides that embed interactive D3.js histograms and render LaTeX math equations.
* **`hierarchy-table/`**: A plugin for displaying hierarchical data in a formatted table, useful for organizational charts or nested data structures.
* **`restaurant-menu/`**: An advanced plugin for generating elegant, print-ready restaurant menus from Markdown, featuring custom HTML handling and grayscale logo integration.

## How to Use These Plugins with `oshea`

Using plugins from this collection is straightforward with `oshea`'s built-in collection management commands.

### 1. Add the Collection

To make these plugins available to your `oshea` installation, simply add this repository as a plugin collection:

```bash
oshea collection add https://github.com/brege/oshea-plugins.git
```

This command will download the collection and register its plugins for use with your `oshea` installation.

### 2. Discover and Explore Plugins

Once the collection is added, you can list all available plugins and get detailed help for specific ones:

  * **List All Plugins (including this collection's):**

    ```bash
    oshea plugin list
    ```

  * **Get Detailed Help for a Plugin:**

    ```bash
    oshea plugin help advanced-card-red
    oshea plugin help d3-histogram-slide
    oshea plugin help restaurant-menu
    ```

### 3. Convert Documents Using a Plugin

After adding the collection, you can use any of its plugins with the `oshea convert` or `generate` commands.

  * **Example: Convert an Advanced Business Card:**
    Assuming you have the example Markdown file for `advanced-card-red` (e.g., `advanced-card-red-example.md` from this repository), you can convert it using:

    ```bash
    oshea convert advanced-card-red-example.md --plugin advanced-card-red
    ```

  * **Example: Generate a D3 Histogram Slide:**
    Similarly, for the D3 histogram slide:

    ```bash
    oshea convert d3-histogram-slide-example.md --plugin d3-histogram-slide
    ```

  * **Example: Generate a Restaurant Menu:**
    If you have the `restaurant-menu-example.md` from this repository, you can generate the menu using:

    ```bash
    oshea convert restaurant-menu-example.md --plugin restaurant-menu
    ```

---

For more comprehensive details on `oshea` usage, plugin development, and configuration, please refer to the main [oshea documentation](https://github.com/brege/oshea#readme).

