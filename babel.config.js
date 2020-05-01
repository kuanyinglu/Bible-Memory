module.exports = function (api) {
    const presets = ["@babel/preset-react", 
    "@babel/preset-env",
    ];
    const plugins = ["@babel/plugin-transform-runtime"];
    api.cache(true);

    return {
        presets,
        plugins
    };
}