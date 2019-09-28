var shell = require('shelljs');

shell.cp('./src/html/Index.ejs', './dist/Index.ejs');
shell.cp('./src/html/Login.ejs', './dist/Login.ejs');
shell.cp('./src/server/app.js', './dist/app.js');
shell.cp('./src/server/dataActionSetup.js', './dist/dataActionSetup.js');
shell.cp('./src/server/expressSetup.js', './dist/expressSetup.js');
shell.cp('./src/server/pageSetup.js', './dist/pageSetup.js');
shell.cp('./src/server/resourceSetup.js', './dist/resourceSetup.js');
shell.cp('./src/server/dataAccess/savedVerses.js', './dist/savedVerses.js');
shell.cp('./src/server/dataAccess/savedSettings.js', './dist/savedSettings.js');
shell.cp('./src/server/dataAccess/client.js', './dist/client.js');
shell.cp('./src/js/authentication.js', './dist/authentication.js');
shell.exec('npx webpack --config webpack.development.config.js');
shell.env["NODE_ENV"] = "development";
shell.exec('node ./dist/app.js');