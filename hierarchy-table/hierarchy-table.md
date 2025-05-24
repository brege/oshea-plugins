# Hierarchy Table of md-to-pdf

A handy table that helps you navigate the hierarchy of md-to-pdf content matter.

## Plugins, Configs, and Assets

| Configuration Aspect                                     | Highest Precedence (Wins)                                                                                                | Middle Precedence                                                                                                         | Lowest Precedence (Base)                                                                 | Effect of `--factory-defaults` Flag                                                                 |
| :------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| **Main Config** <br> (Globals: `pdf_viewer`, `params`, `global_pdf_options`, initial plugin registration) | `--config <project_specific.yaml>`                                                                                       | `~/.config/md-to-pdf/config.yaml` (XDG)                                                                   | `~/md-to-pdf/config.yaml` <br> (or `~/md-to-pdf/config.example.yaml` as fallback)        | Uses `~/md-to-pdf/config.example.yaml` only.                                                        |
| **Plugin Settings** <br> (e.g., `pdf_options`, `math` for a specific plugin) | **Project Override:** <br> 1. Inline object in `--config <file>` <br> 2. Separate file via `--config <file>`                          | **XDG Override:** <br> 1. Inline object in `~/.config/md-to-pdf/config.yaml` <br> 2. File at `~/.config/md-to-pdf/<plugin>/<plugin>.config.yaml` | Plugin's own `<pluginName>.config.yaml` (e.g., `~/md-to-pdf/plugins/cv/cv.config.yaml`) | Uses Plugin's own default settings + Globals from `~/md-to-pdf/config.example.yaml` only. |
| **CSS Files** <br> (for a specific plugin, respects `inherit_css`) | **Project Override:** <br> `css_files` from: <br> 1. Inline object in `--config <file>` <br> 2. Separate file via `--config <file>` | **XDG Override:** <br> `css_files` from: <br> 1. Inline object in `~/.config/md-to-pdf/config.yaml` <br> 2. File at `~/.config/md-to-pdf/<plugin>/<plugin>.config.yaml` | Plugin's own default `css_files` list.                                                   | Uses Plugin's own default `css_files` only.                                                         |

**Notes on Asset Path Resolution for Inline Overrides (v0.5.5 feature):**
* Paths for `css_files` (or other assets) defined within an **inline object** are resolved relative to the main configuration file where that inline object resides.
  * e.g., If inline in `~/.config/md-to-pdf/config.yaml`, paths are relative to `~/.config/md-to-pdf/`.
  * e.g., If inline in a project's `--config some_project_config.yaml`, paths are relative to the directory of `some_project_config.yaml`.
* Paths in **separate override files** are resolved relative to the directory of that specific override file.
* Paths in a **plugin's own default `<pluginName>.config.yaml`** are resolved relative to that plugin's directory.
