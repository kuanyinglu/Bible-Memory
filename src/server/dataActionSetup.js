const authentication = require('./authentication.js');
const { fetchVerses, updateVerses } = require('./savedVerses.js');
const { fetchSettings, updateSettings } = require('./savedSettings.js');
const environment = process.env.NODE_ENV || 'production';

const getVerses = function(id) {
  return fetchVerses(id);
};

module.exports = {
  setup: function (server) {
    server.post('/getVerses', async function (req, res) {
      if (environment === 'development') {
        let result = await getVerses('test');
        res.send(result);
      } else {
        authentication.getId(req.cookies.idToken).then(async function(id) {
          if (typeof id !== 'undefined' && id !== null) {
            res.send(await getVerses(id));
          } else {
            res.send(401, 'error');
          }
        }).catch(function(){
          res.send(401, 'error');
        });
      }
    });
    server.post('/saveVerses', async function (req, res) {
      if (environment === 'development') {
        let result = await updateVerses('test', req.body.verses);
        res.send(result);
      } else {
        authentication.getId(req.cookies.idToken).then(async function(id) {
          if (typeof id !== 'undefined' && id !== null) {
            res.send(await updateVerses(id, req.body.verses));
          } else {
            res.send(401, 'error');
          }
        }).catch(function(){
          res.send(401, 'error');
        });
      }
    });
    server.post('/getSettings', async function (req, res) {
      if (environment === 'development') {
        let result = await fetchSettings('test');
        res.send(result);
      } else {
        authentication.getId(req.cookies.idToken).then(async function(id) {
          if (typeof id !== 'undefined' && id !== null) {
            res.send(await fetchSettings(id));
          } else {
            res.send(401, 'error');
          }
        }).catch(function(){
          res.send(401, 'error');
        });
      }
    });
    server.post('/saveSettings', async function (req, res) {
      if (environment === 'development') {
        let result = await updateSettings('test', req.body.settings);
        res.send(result);
      } else {
        authentication.getId(req.cookies.idToken).then(async function(id) {
          if (typeof id !== 'undefined' && id !== null) {
            res.send(await updateSettings(id, req.body.settings));
          } else {
            res.send(401, 'error');
          }
        }).catch(function(){
          res.send(401, 'error');
        });
      }
    });
  }
};