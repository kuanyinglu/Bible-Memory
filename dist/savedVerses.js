let { getClient } = require('./client.js');

module.exports = {
  fetchVerses: async function(id) {
    let client = getClient();
    client.connect();
    const query = {
      text: 'SELECT json FROM verses WHERE id=$1 ',
      values: [id],
    }
    let result = null;
    try {
      result = await client.query(query);
    } catch (e) {
      console.log("Error in getting verses:" + e.stack);
    } finally {
      await client.end();
    }
    return result !== null && result.rows.length === 1 ? result.rows[0].json : {};
  },
  updateVerses: async function(id, newValue) {
    let success = true;
    let client = getClient();
    client.connect();
    const query = {
      text: 'INSERT INTO verses (id, json, time) ' +
            'VALUES ($1, $2, current_timestamp) ' +
            'ON CONFLICT (id) DO UPDATE ' +
            'SET json=$2, time=current_timestamp ',
      values: [id, newValue],
    }
    try {
      await client.query(query);
    } catch (e) {
      console.log("Error in inserting verses:" + e.stack);
      success = false;
    } finally {
      await client.end();
    }
    return success;
  },

};