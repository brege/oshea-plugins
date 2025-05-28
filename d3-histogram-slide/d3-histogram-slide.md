---
title: "D3 Histogram and Blackbody Radiation"
md_to_pdf_plugin: "d3-histogram-slide" 
---

# D3.js Histogram & Blackbody Radiation Equation

This slide demonstrates an embedded **D3.js** histogram on the left-hand side, and a **KaTeX** rendered equation for **Blackbody Radiation** (Planck's Law) on the right-hand side


**Planck's Law** for **Blackbody Radiance**, $B_\lambda$ as a function of **wavelength, $\lambda$,** at Temperature, $T$:

$$
B_\lambda(T) = \frac{2hc^2}{\lambda^5} \frac{1}{e^{hc/\lambda k_B T} - 1}
$$

*where, in a markdown table with embedded LaTeX:*

|                |                                              |
|----------------|----------------------------------------------|
| $B_\lambda(T)$ | **spectral radiance** at thermal equilibrium |
| $h$            | Planck's constant                            |
| $c$            | the speed of light                           |
| $\lambda$      | **wavelength** |
| $k_B$          | the Boltzmann constant                       |
| $T$            | the absolute temperature                     |


**Note:** injecting **LaTeX** math into the `d3.js` axes will require significant complexity. 🤓
