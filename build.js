var shell = require('shelljs');

shell.exec('npx webpack --config webpack.development.config.js');
shell.cp('./src/html/Index.html', './dist/Index.html');