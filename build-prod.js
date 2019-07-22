var shell = require('shelljs');

shell.exec('npx webpack -p  --config webpack.production.config.js');
shell.cp('./src/html/Index.html', './dist/Index.html');