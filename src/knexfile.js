// Update with your config settings.
const { password } = require('../.env')

module.exports = {
  client: 'postgresql',
  connection: {
    database: 'db_graphql',
    user: 'postgres',
    password: password
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}
