module.exports = function (api) {
    const presets = ["@babel/preset-react", "@babel/preset-env"];
    const plugins = [];
    api.cache(true);

    return {
        presets,
        plugins
    };
}