const token = process.env.TOKEN;
const authentication = require('./authentication.js');
const environment = process.env.NODE_ENV || 'production';

module.exports = {
  setup: function (server) {
    server.get('/token.js', function (req, res) {
      if (environment === 'development') {
          if (typeof token !== 'undefined') {
              res.send("var token = \"" + token + "\";");
          } else {
              res.sendFile(__dirname + '/token.js');
          }
      } else {
          authentication.authenticate(req.cookies.idToken).then(function(idToken) {
              if (typeof idToken !== 'undefined' && idToken !== null) {
                  if (typeof token !== 'undefined') {
                      res.send("var token = \"" + token + "\";");
                  } else {
                      res.sendFile(__dirname + '/token.js');
                  }
              } else {
                res.status(401).send('error');
              }
          }).catch(function(){
            res.status(401).send('error');
          });
      }
    });

    server.get('/bundle.js', function (req, res) {
      if (environment === 'development') {
          res.sendFile(__dirname + '/bundle.js');
      } else {
          authentication.authenticate(req.cookies.idToken).then(function(idToken) {
              if (typeof idToken !== 'undefined' && idToken !== null) {
                  res.sendFile(__dirname + '/bundle.js');
              } else {
                res.status(401).send('error');
              }
          }).catch(function(){
            res.status(401).send('error');
          });
      }
    });
  }
}