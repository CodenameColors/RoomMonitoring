//update with config settings.

require('dotenv').config()

module.exports = {
  
  client: 'pg',
  connection: {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST
  }
};