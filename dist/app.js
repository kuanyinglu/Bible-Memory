const port = process.env.PORT || 3000;
const expressServer = require('./expressSetup.js');

require('./pageSetup.js').setup(expressServer);
require('./resourceSetup.js').setup(expressServer);
require('./dataActionSetup.js').setup(expressServer);

expressServer.listen(port, () => console.log(`App listening on port ${port}!`));