var shell = require('shelljs');

shell.exec('webpack --config webpack.development.config.js');
shell.cp('./src/html/Index.html', './dist/Index.html');
shell.cp('./src/css/app.css', './dist/app.css');