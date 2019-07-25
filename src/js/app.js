const express = require('express');
import { authenticate  } from './authentication.js';
const cookieParser = require('cookie-parser')
const app = express();
const port = process.env.PORT || 3000;
const clientId = process.env.CLIENT_ID;

app.use(cookieParser());

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    if (authenticate(req.cookies.idToken) !== null) {
        res.render(__dirname + '/Index.ejs');
    } else {
        res.redirect('/login');
    }
});

app.get(['/verses', '/settings', '/practice'], function (req, res) {
    res.redirect('/');
});

app.get(['/login',], function (req, res) {
    if (authenticate(req.cookies.idToken) === null) {
        res.render(__dirname + '/Login.ejs', {clientId: clientId});
    } else {
        res.redirect('/');
    }
});

app.get(['/authenticate',], function (req, res) {
    let idToken = authenticate(req.params.id);
    if (idToken !== null) {
        res.cookie("idToken", idToken, { maxAge: 3600000, secure: true, httpOnly: true });
    } else {
        res.redirect('/');
    }
});

app.get('/token.js', function (req, res) {
    if (authenticate(req.cookies.idToken) !== null) {
        res.sendFile(__dirname + '/token.js');
    } else {
        res.send(401, 'error');
    }
});

app.get('/verses.js', function (req, res) {
    if (authenticate(req.cookies.idToken) !== null) {
        res.sendFile(__dirname + '/verses.js');
    } else {
        res.send(401, 'error');
    }
});

app.get('/bundle.js', function (req, res) {
    if (authenticate(req.cookies.idToken) !== null) {
        res.sendFile(__dirname + '/bundle.js');
    } else {
        res.send(401, 'error');
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));