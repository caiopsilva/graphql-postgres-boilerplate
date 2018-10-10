exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('users', table => {
      table.uuid('id').unique().primary().notNullable()
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.string('password').notNullable()
    })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
}
