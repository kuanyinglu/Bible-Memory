const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgresql://BibleMemoryTest:test@localhost:5432/BibleMemory';

const client = new Client({
  connectionString: connectionString,
  ssl: true,
});

module.exports = client;
};