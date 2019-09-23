let client = require('./client.js');

module.exports = {
  fetchVerses: async function(id) {
    client.connect();
    const query = {
      text: 'SELECT json FROM verses WHERE id=$1 ',
      values: [id],
    }
    let result = null;
    try {
      result = await client.query(query);
    } catch (e) {
      console.log(e => console.log("Error in getting verses:" + e.stack));
    } finally {
      await client.end();
    }
    return result !== null ? result.rows[0].json : null;
  },
  updateVerses: async function(id, newValue) {
    client.connect();
    const query = {
      text: 'MERGE verses v '+
            'USING (SELECT id FROM verses WHERE id=$1 AS s) ' +
            'ON v.id = s.id ' +
            'WHEN MATCHED ' +
            '  UPDATE SET json=$2 ' +
            'WHEN NOT MATCHED ' +
            '  INSERT (id, json, time) ' +
            '  VALUES ($1, $2, current_timestamp',
      values: [id, newValue],
    }
    try {
      await client.query(query);
    } catch (e) {
      console.log(e => console.log("Error in inserting verses:" + e.stack));
    } finally {
      await client.end();
    }
    return JSON.stringify({ 'success': true });
  },

};