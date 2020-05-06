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
        res.send(await getVerses('test'));
      } else {
        authentication.getId(req.cookies.idToken).then(async function(id) {
          if (typeof id !== 'undefined' && id !== null) {
            res.send(await getVerses(id));
          } else {
            res.status(401).send('error');
          }
        }).catch(function(){
          res.status(401).send('error');
        });
      }
    });
    server.post('/saveVerses', async function (req, res) {
      if (environment === 'development') {
        let success = await updateVerses('test', req.body.verses);
        if (success) {
          res.send(await getVerses('test'));
        }
      } else {
        authentication.getId(req.cookies.idToken).then(async function(id) {
          if (typeof id !== 'undefined' && id !== null) {
            let success = await updateVerses(id, req.body.verses);
            if (success) {
              res.send(await getVerses(id));
            }
            res.send();
          } else {
            res.status(401).send('error');
          }
        }).catch(function(){
          res.status(401).send('error');
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
            res.status(401).send('error');
          }
        }).catch(function(){
          res.status(401).send('error');
        });
      }
    });
    server.post('/saveSettings', async function (req, res) {
      if (environment === 'development') {
        let success = await updateSettings('test', req.body.settings);
        if (success) {
          res.send(await fetchSettings('test'));
        }
      } else {
        authentication.getId(req.cookies.idToken).then(async function(id) {
          if (typeof id !== 'undefined' && id !== null) {
            let success = await updateSettings(id, req.body.settings);
            if (success) {
              res.send(await fetchSettings(id));
            }
          } else {
            res.status(401).send('error');
          }
        }).catch(function(){
          res.status(401).send('error');
        });
      }
    });
  }
};
