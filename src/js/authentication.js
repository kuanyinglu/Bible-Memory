const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(clientId);

module.exports = {
  authenticate: async function(idToken, clientId) {
    if (typeof idToken === 'undefined' || idToken.length === 0 || typeof clientId === 'undefined' || clientId.length === 0) {
      return null;
    } else {
      const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: clientId,
      });
      const payload = ticket.getPayload();
      if (typeof payload === 'undefined' || payload === null || payload['hd'] !== domain || payload['aud'] !== clientId)
      {
        return null;
      } else {
        return idToken;
      }
    }
  }
};