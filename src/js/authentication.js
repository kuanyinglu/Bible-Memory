const {OAuth2Client} = require('google-auth-library');
const clientId = process.env.CLIENT_ID;
const client = new OAuth2Client(clientId);

module.exports = {
  authenticate: async function(idToken) {
    if (typeof idToken === 'undefined' || idToken.length === 0 || typeof clientId === 'undefined' || clientId.length === 0) {
      console.log("token length is 0" + idToken.length === 0);
      console.log("client Id undefined" + typeof clientId);
      return null;
    } else {
      const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: clientId,
      });
      const payload = ticket.getPayload();
      if (typeof payload === 'undefined' || payload === null || payload['hd'] !== domain || payload['aud'] !== clientId)
      {
        console.log("something is wrong in checking token");
        return null;
      } else {
        console.log("everythign good");
        return idToken;
      }
    }
  }
};