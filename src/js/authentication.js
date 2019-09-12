module.exports = {
  authenticate: async function(idToken, client, clientId) {
    console.log("ClientId length: " + clientId.length);
    console.log("token length: " + idToken.length);
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
        console.log("not verified");
        return null;
      } else {
        return idToken;
      }
    }
  }
};