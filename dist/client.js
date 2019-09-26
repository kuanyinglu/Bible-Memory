const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgresql://BibleMemoryTest:test@localhost:5432/BibleMemory';
const environment = process.env.NODE_ENV || 'production';

module.exports = {
  getClient: function() {
    return new Client({
      connectionString: connectionString,
      ssl: environment !== 'development'
    });
  }
};