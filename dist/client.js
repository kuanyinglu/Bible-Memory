const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgresql://BibleMemoryTest:test@localhost:5432/BibleMemory';

let client = new Client({
  connectionString: connectionString,
  ssl: false,
});

module.exports = client;