var shell = require('shelljs');

shell.cp('./src/html/Index.ejs', './dist/Index.ejs');
shell.cp('./src/html/Login.ejs', './dist/Login.ejs');
shell.cp('./src/js/app.js', './dist/app.js');
shell.exec('npx webpack -p  --config webpack.production.config.js');