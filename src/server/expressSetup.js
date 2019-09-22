const express = require('express');
const expressInstance = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const requireHTTPS = function(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

expressInstance.use(requireHTTPS);
expressInstance.use(bodyParser.urlencoded({ extended: true }));
expressInstance.use(cookieParser());

expressInstance.set('view engine', 'ejs');

module.exports = expressInstance;