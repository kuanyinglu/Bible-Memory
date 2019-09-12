const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;
const clientId = process.env.CLIENT_ID;
const domain = process.env.DOMAIN;
const token = process.env.TOKEN;
const authentication = require('./authentication.js');
const environment = process.env.NODE_ENV || 'production';

const requireHTTPS = function(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

app.use(requireHTTPS);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
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

app.get(['/verses', '/settings', '/practice'], function (req, res) {
    res.redirect('/');
});

app.get(['/login',], function (req, res) {
    if (environment === 'development') {
        res.redirect('/');
    } else {
        authentication.authenticate(req.cookies.idToken).then(function(idToken) {
            if (typeof idToken === 'undefined' || idToken === null) {
                res.render(__dirname + '/Login.ejs', {clientId: clientId, domain: domain, isProd: process.env.NODE_ENV !== "development"});
            } else {
                res.redirect('/');
            }
        }).catch(function(){
            res.send(500, 'error');
        });
    }
});

app.post(['/authenticate',], function (req, res) {
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
        }).catch(function(){
            res.redirect('/');
        });
    }
});

app.get('/token.js', function (req, res) {
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
                res.send(401, 'error');
            }
        }).catch(function(){
            res.send(401, 'error');
        });
    }
});

app.get('/verses.js', function (req, res) {
    if (environment === 'development') {
        res.sendFile(__dirname + '/verses.js');
    } else {
        authentication.authenticate(req.cookies.idToken).then(function(idToken) {
            if (typeof idToken !== 'undefined' && idToken !== null) {
                res.sendFile(__dirname + '/verses.js');
            } else {
                res.send(401, 'error');
            }
        }).catch(function(){
            res.send(401, 'error');
        });
    }
});

app.get('/bundle.js', function (req, res) {
    if (environment === 'development') {
        res.sendFile(__dirname + '/bundle.js');
    } else {
        authentication.authenticate(req.cookies.idToken).then(function(idToken) {
            if (typeof idToken !== 'undefined' && idToken !== null) {
                res.sendFile(__dirname + '/bundle.js');
            } else {
                res.send(401, 'error');
            }
        }).catch(function(){
            res.send(401, 'error');
        });
    }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));