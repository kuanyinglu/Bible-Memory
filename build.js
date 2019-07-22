var shell = require('shelljs');

shell.cp('./src/html/Index.html', './dist/Index.html');
shell.cp('./src/js/app.js', './dist/app.js');
shell.exec('npx webpack --config webpack.development.config.js');
shell.exec('node ./dist/app.js');