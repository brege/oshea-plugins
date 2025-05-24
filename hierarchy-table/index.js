// ../md-to-pdf-plugins/hierarchy-table/index.js
class HierarchyTableHandler {
    constructor(coreUtils) {
        // coreUtils contains { DefaultHandler, markdownUtils, pdfGenerator }
        this.handler = new coreUtils.DefaultHandler(); 
    }

    async generate(data, pluginSpecificConfig, globalConfig, outputDir, outputFilenameOpt, pluginBasePath) {
        console.log(`INFO (HierarchyTableHandler): Processing for plugin '${pluginSpecificConfig.description || 'hierarchy-table'}'`);
        return this.handler.generate(data, pluginSpecificConfig, globalConfig, outputDir, outputFilenameOpt, pluginBasePath);
    }
}
module.exports = HierarchyTableHandler;
