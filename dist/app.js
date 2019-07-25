const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;
const clientId = process.env.CLIENT_ID || "794214659031-93k2plhtt3mhinrfvcj825ohkvckk0v5.apps.googleusercontent.com";

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
  console.log("Payload: ");
  console.log(payload);
  if (payload['hd'] !== 'utexas.edu' && payload['aud'] !== clientId)
  {
      return null;
  }
  return idToken;
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    console.log("Cookies: ");
    console.log(req.cookies);
    var idToken = authenticate(req.cookies.idToken);
    if (idToken !== null) {
        res.render(__dirname + '/Index.ejs');
    } else {
        res.redirect('/login');
    }
});

app.get(['/verses', '/settings', '/practice'], function (req, res) {
    res.redirect('/');
});

app.get(['/login',], function (req, res) {
    var idToken = authenticate(req.cookies.idToken);
    if (idToken === null) {
        res.render(__dirname + '/Login.ejs', {clientId: clientId});
    } else {
        res.redirect('/');
    }
});

app.post(['/authenticate',], function (req, res) {
    var idToken = authenticate(req.body.id);
    if (idToken !== null) {
        res.cookie("idToken", idToken, { maxAge: 3600000, secure: true, httpOnly: true });
    } else {
        res.redirect('/');
    }
});

app.get('/token.js', function (req, res) {
    var idToken = authenticate(req.cookies.idToken);
    if (idToken !== null) {
        res.sendFile(__dirname + '/token.js');
    } else {
        res.send(401, 'error');
    }
});

app.get('/verses.js', function (req, res) {
    var idToken = authenticate(req.cookies.idToken);
    if (idToken !== null) {
        res.sendFile(__dirname + '/verses.js');
    } else {
        res.send(401, 'error');
    }
});

app.get('/bundle.js', function (req, res) {
    var idToken = authenticate(req.cookies.idToken);
    if (idToken !== null) {
        res.sendFile(__dirname + '/bundle.js');
    } else {
        res.send(401, 'error');
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));