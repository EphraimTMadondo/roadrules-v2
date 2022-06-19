export default {
    webpack(config, env, helpers, options) {
        const manifestPlugin = helpers.getPluginsByName(config, 'InjectManifest')[0];
        if (manifestPlugin) {
            manifestPlugin.plugin.config.maximumFileSizeToCacheInBytes = 5 * 1024 * 1024; // or however much you need. This is 5mb.
        } 
    }
}