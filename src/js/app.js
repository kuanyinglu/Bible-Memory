const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port = process.env.PORT || 3000;
const clientId = process.env.CLIENT_ID;

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(clientId);

async function authenticate(idToken) {
  if (typeof idToken === 'undefined' || typeof clientId === 'undefined') {
      return null;
  }
  
  const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: clientId,
  });
  const payload = ticket.getPayload();
  if (payload['hd'] !== 'utexas.edu' && payload['aud'] !== clientId)
  {
      return null;
  }
  return idToken;
};

app.use(cookieParser());

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    authenticate(req.cookies.idToken).then(idToken => {
        if (idToken !== null) {
            res.render(__dirname + '/Index.ejs');
        } else {
            res.redirect('/login');
        }
    });
});

app.get(['/verses', '/settings', '/practice'], function (req, res) {
    res.redirect('/');
});

app.get(['/login',], function (req, res) {
    authenticate(req.cookies.idToken).then(idToken => {
        if (idToken !== null) {
            res.render(__dirname + '/Login.ejs', {clientId: clientId});
        } else {
            res.redirect('/');
        }
    });
});

app.get(['/authenticate',], function (req, res) {
    authenticate(req.params.id).then(idToken => {
        if (idToken !== null) {
            res.cookie("idToken", idToken, { maxAge: 3600000, secure: true, httpOnly: true });
        } else {
            res.redirect('/');
        }
    });
});

app.get('/token.js', function (req, res) {
    authenticate(req.cookies.idToken).then(idToken => {
        if (idToken !== null) {
            res.sendFile(__dirname + '/token.js');
        } else {
            res.send(401, 'error');
        }
    });
});

app.get('/verses.js', function (req, res) {
    authenticate(req.cookies.idToken).then(idToken => {
        if (idToken !== null) {
            res.sendFile(__dirname + '/verses.js');
        } else {
            res.send(401, 'error');
        }
    });
});

app.get('/bundle.js', function (req, res) {
    authenticate(req.cookies.idToken).then(idToken => {
        if (idToken !== null) {
            res.sendFile(__dirname + '/bundle.js');
        } else {
            res.send(401, 'error');
        }
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));