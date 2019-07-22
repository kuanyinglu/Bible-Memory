var shell = require('shelljs');

shell.cp('./src/html/Index.html', './dist/Index.html');
// shell.exec('npx webpack --config webpack.development.config.js');
shell.exec('npx webpack-dev-server --open --config webpack.development.config.js');