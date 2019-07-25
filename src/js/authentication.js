const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
const clientId = process.env.CLIENT_ID;

const authenticate = idToken => {
  if (typeof idToken !== 'undefined' && typeof clientId !== 'undefined') {
      return null;
  }
  
  const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (payload['hd'] !== 'utexas.edu' && payload['aud'] !== clientId)
  {
      return null;
  }
  return idToken;
};

module.exports = authenticate;