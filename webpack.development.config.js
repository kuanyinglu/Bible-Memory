const path = require('path');

module.exports = {
  mode: "development", // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  entry: "./src/js/app.js", // string | object | array  // defaults to './src'
  // Here the application starts executing
  // and webpack starts bundling
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, "dist"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: "bundle.js", // string    // the filename template for entry chunks},
  },
  module: {
    // configuration regarding modules
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, "app")
        ],
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      }
    ],
  },
  context: __dirname, // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory
}