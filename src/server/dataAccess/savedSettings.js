let { getClient } = require('./client.js');

module.exports = {
  fetchSettings: async function(id) {
    let client = getClient();
    client.connect();
    const query = {
      text: 'SELECT json FROM settings WHERE id=$1 ',
      values: [id],
    }
    let result = null;
    try {
      result = await client.query(query);
    } catch (e) {
      console.log("Error in getting settings:" + e.stack);
    } finally {
      await client.end();
    }
    return result !== null && result.rows.length === 1 ? result.rows[0].json : {};
  },
  updateSettings: async function(id, newValue) {
    let client = getClient();
    client.connect();
    const query = {
      text: 'INSERT INTO settings (id, json, time) ' +
            'VALUES ($1, $2, CURRENT_TIMESTAMP) ' +
            'ON CONFLICT (id) DO UPDATE ' +
            'SET json=$2, time=CURRENT_TIMESTAMP ',
      values: [id, newValue],
    }
    try {
      await client.query(query);
    } catch (e) {
      console.log("Error in inserting settings:" + e.stack);
    } finally {
      await client.end();
    }
    return JSON.stringify({ 'success': true });
  },

};