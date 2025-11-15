const fs = require('fs').promises;
const fss = require('fs');
const path = require('path');

class D3HistogramSlideHandler {
    constructor(coreUtils) {
        this.markdownUtils = coreUtils.markdownUtils;
        this.pdfGenerator = coreUtils.pdfGenerator;
        this.d3ScriptContent = '';
        this.katexCssContent = '';
    }

    async loadScriptsAndStyles(pluginBasePath, globalConfig) {
        // Load D3.js script
        if (!this.d3ScriptContent) {
            const d3Path = path.resolve(pluginBasePath, 'd3.v7.min.js');
            try {
                this.d3ScriptContent = await fs.readFile(d3Path, 'utf8');
            } catch (err) {
                console.error(`ERROR (D3HistogramSlide): Failed to load d3.v7.min.js from ${d3Path}`, err);
                this.d3ScriptContent = 'console.error("Failed to load D3.js library.");';
            }
        }
        // Load KaTeX CSS
        if (!this.katexCssContent && globalConfig.projectRoot) {
            const katexCssPath = path.resolve(globalConfig.projectRoot, 'assets/css/katex.min.css');
            try {
                this.katexCssContent = await fs.readFile(katexCssPath, 'utf8');
                console.log(`INFO (D3HistogramSlide): Loaded KaTeX CSS from ${katexCssPath}`);
            } catch (err) {
                 console.warn(`WARN (D3HistogramSlide): Could not load KaTeX CSS from ${katexCssPath}.`);
            }
        }
    }

    async generate(data, pluginSpecificConfig, globalConfig, outputDir, outputFilenameOpt, pluginBasePath) {
        console.log(`INFO (D3HistogramSlide): Processing for plugin '${pluginSpecificConfig.description}'`);
        await this.loadScriptsAndStyles(pluginBasePath, globalConfig);

        const { markdownFilePath } = data;
        
        let slideTitleHtml = `<h1>Slide Title</h1>`;
        let mainContentHtml = `<p>Error: Could not load Markdown content.</p>`;
        let frontMatter = {};

        if (markdownFilePath) {
            try {
                const rawMarkdownFileContent = await fs.readFile(markdownFilePath, 'utf8');
                const extracted = this.markdownUtils.extractFrontMatter(rawMarkdownFileContent);
                frontMatter = extracted.data;
                const markdownInputContent = extracted.content;

                const fullRenderedHtml = this.markdownUtils.renderMarkdownToHtml(
                    markdownInputContent,
                    pluginSpecificConfig.toc_options,
                    (pluginSpecificConfig.pdf_options || {}).anchor_options,
                    pluginSpecificConfig.math
                );

                const h1Match = fullRenderedHtml.match(/<h1[^>]*>.*?<\/h1>/i);
                if (h1Match) {
                    slideTitleHtml = h1Match[0];
                    mainContentHtml = fullRenderedHtml.substring(h1Match[0].length).trim();
                } else {
                    slideTitleHtml = `<h1>${frontMatter.title || 'Slide Content'}</h1>`;
                    mainContentHtml = fullRenderedHtml;
                }
            } catch (err) {
                console.warn(`WARN (D3HistogramSlide): Could not read Markdown file ${markdownFilePath}. Error: ${err.message}`);
            }
        } else {
             console.warn(`WARN (D3HistogramSlide): No markdownFilePath provided.`);
        }
        
        const htmlBodyContent = `
            <div class="slide-container">
                <div class="slide-title-area">
                    ${slideTitleHtml}
                </div>
                <div class="two-column-layout">
                    <div class="column column-left" id="histogram-area">
                        <svg id="d3-histogram-svg"></svg>
                    </div>
                    <div class="column column-right content-area">
                        ${mainContentHtml}
                    </div>
                </div>
            </div>
            <script>
                // D3 rendering script is now injected after the main d3.js library
                (function() {
                    if (typeof d3 === 'undefined') {
                        console.error('D3.js is not loaded. Histogram cannot be drawn.');
                        const histArea = document.getElementById('histogram-area');
                        if(histArea) histArea.innerHTML = '<p style="color:red; text-align:center;">Error: D3.js library not loaded.</p>';
                        return;
                    }
                    const data = [10, 20, 25, 28, 30, 32, 33, 35, 40, 41, 42, 45, 50, 55, 60, 70, 80, 90, 100, 10, 20, 25];
                    
                    const histAreaElement = document.getElementById('histogram-area');
                    const availableWidth = (histAreaElement && histAreaElement.clientWidth > 0) ? histAreaElement.clientWidth : 400; 
                    
                    const aspectRatio = 4 / 3; 
                    let svgContainerWidth = availableWidth - 20; 
                    let svgContainerHeight = svgContainerWidth / aspectRatio;

                    const margin = {top: 25, right: 15, bottom: 50, left: 50}; 

                    let plotWidth = svgContainerWidth - margin.left - margin.right;
                    let plotHeight = svgContainerHeight - margin.top - margin.bottom;

                    if (plotWidth < 100) plotWidth = 100; 
                    if (plotHeight < 120) plotHeight = 120; 

                    svgContainerWidth = plotWidth + margin.left + margin.right;
                    svgContainerHeight = plotHeight + margin.top + margin.bottom;

                    const svg = d3.select("#d3-histogram-svg")
                        .attr("viewBox", \`0 0 \${svgContainerWidth} \${svgContainerHeight}\`) 
                        .attr("preserveAspectRatio", "xMidYMid meet")
                        .attr("width", "100%")
                        .attr("height", "100%")
                       .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    const x = d3.scaleLinear().domain([0, d3.max(data)]).range([0, plotWidth]);
                    svg.append("g").attr("transform", "translate(0," + plotHeight + ")")
                        .call(d3.axisBottom(x).ticks(Math.max(2, Math.floor(plotWidth / 60))))
                        .selectAll("text")
                        .style("font-size", Math.max(8, Math.floor(plotWidth / 60)) + "px");

                    svg.append("text")
                        .attr("text-anchor", "middle")
                        .attr("x", plotWidth / 2)
                        .attr("y", plotHeight + margin.bottom * 0.8) 
                        .text("Wavelength (nm)")
                        .style("font-size", Math.max(9, Math.floor(plotWidth / 50)) + "px");

                    const y = d3.scaleLinear().range([plotHeight, 0]);
                    const histogram = d3.histogram().value(d => d).domain(x.domain()).thresholds(x.ticks(Math.max(3, Math.floor(plotWidth/40)))); 
                    const bins = histogram(data);
                    y.domain([0, d3.max(bins, d => d.length)]); 

                    svg.append("g")
                        .call(d3.axisLeft(y).ticks(Math.max(2, Math.floor(plotHeight / 30))))
                        .selectAll("text")
                        .style("font-size", Math.max(8, Math.floor(plotHeight / 30)) + "px");

                    svg.append("text")
                        .attr("text-anchor", "middle")
                        .attr("transform", "rotate(-90)")
                        .attr("y", -margin.left + 15 ) 
                        .attr("x", -plotHeight / 2)
                        .text("Spectral Radiance (W/m^2/sr/nm)")
                        .style("font-size", Math.max(9, Math.floor(plotHeight / 25)) + "px");
                        
                    svg.selectAll("rect").data(bins).enter().append("rect")
                       .attr("x", 1)
                       .attr("transform", d => "translate(" + x(d.x0) + "," + y(d.length) + ")")
                       .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) -1) )
                       .attr("height", d => Math.max(0, plotHeight - y(d.length)))
                       .style("fill", "#69b3a2");
                })();
            </script>
        `;
        
        const outputFilename = outputFilenameOpt || `${this.markdownUtils.generateSlug(frontMatter.title || 'd3-histogram-slide')}.pdf`;
        const finalOutputPdfPath = path.join(outputDir, outputFilename);

        const pdfOptions = {
            ...(globalConfig.global_pdf_options || {}),
            ...(pluginSpecificConfig.pdf_options || {}),
            margin: { 
                ...((globalConfig.global_pdf_options || {}).margin || {}),
                ...((pluginSpecificConfig.pdf_options || {}).margin || {}),
            }
        };
        if (pdfOptions.width || pdfOptions.height) { delete pdfOptions.format; }

        let cssFileContentsArray = [];
        if (pluginSpecificConfig.css_files && Array.isArray(pluginSpecificConfig.css_files)) {
            for (const cssFile of pluginSpecificConfig.css_files) {
                const cssFilePath = path.resolve(pluginBasePath, cssFile);
                try {
                    cssFileContentsArray.push(await fs.readFile(cssFilePath, 'utf8'));
                } catch (err) {
                    console.warn(`WARN (D3HistogramSlide): Plugin CSS file not found or could not be read: ${cssFilePath}`);
                }
            }
        }
        
        // ** THE FIX **
        // Inject KaTeX CSS and D3.js directly into the <head> of the document.
        const injectionPoints = {
            head_html: `
                <style>${this.katexCssContent}</style>
                <script>${this.d3ScriptContent}</script>
            `
        };

        await this.pdfGenerator.generatePdf(
            htmlBodyContent,
            finalOutputPdfPath,
            pdfOptions,
            cssFileContentsArray,
            null, // Use default template
            injectionPoints
        );

        console.log(`INFO (D3HistogramSlide): Successfully generated PDF: ${finalOutputPdfPath}`);
        return finalOutputPdfPath;
    }
}

module.exports = D3HistogramSlideHandler;
