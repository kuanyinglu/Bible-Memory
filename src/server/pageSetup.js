const clientId = process.env.CLIENT_ID;
const domain = process.env.DOMAIN;
const authentication = require('./authentication.js');
const environment = process.env.NODE_ENV || 'production';

module.exports = {
  setup: function (server) {
    server.get('/', function (req, res) {
      if (environment === 'development') {
          res.render(__dirname + '/Index.ejs');
      } else {
          authentication.authenticate(req.cookies.idToken).then(function(idToken) {
              if (typeof idToken !== 'undefined' && idToken !== null) {
                  res.render(__dirname + '/Index.ejs');
              } else {
                  res.redirect('/login');
              }
          }).catch(function(){
              res.redirect('/login');
          });
      }
    });
    
    server.get(['/verses', '/settings', '/practice'], function (req, res) {
      res.redirect('/');
    });
    
    server.get(['/login',], function (req, res) {
      if (environment === 'development') {
        res.redirect('/');
      } else {
        authentication.authenticate(req.cookies.idToken).then(function(idToken) {
          if (typeof idToken === 'undefined' || idToken === null) {
              res.render(__dirname + '/Login.ejs', {clientId: clientId, domain: domain, isProd: environment !== "development"});
          } else {
              res.redirect('/');
          }
        }).catch(function(){
          res.send(500, 'error');
        });
      }
    });
    
    server.get(['/test',], function (req, res) {
        res.render(__dirname + '/Login.ejs', {clientId: clientId, domain: domain, isProd: environment !== "development"});
    });
    
    server.post(['/authenticate',], function (req, res) {
      if (environment === 'development') {
        res.send(404, 'error');
      } else {
        authentication.authenticate(req.body.id).then(function(idToken) {
          if (typeof idToken !== 'undefined' && idToken !== null) {
              res.cookie("idToken", idToken, { maxAge: 3600000, secure: true, httpOnly: true });
              res.redirect('/');
          } else {
              res.send(401, 'error');
          }
        }).catch(function(e){
          console.log("error in authentication:" + e);
          res.redirect('/');
        });
      }
    });
    
    server.post(['/logout',], function (req, res) {
      if (environment === 'development') {
        res.send(404, 'error');
      } else {
        authentication.revokeToken(req.cookies.idToken).then(function(result) {
          if (typeof result !== 'undefined' && result.success) {
              res.redirect('/');
          } else {
              res.send(401, 'error');
          }
        }).catch(function(e){
          console.log("account already unauthorized" + e);
          res.redirect('/');
        });
      }
    });
  }
};
