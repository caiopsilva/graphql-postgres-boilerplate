exports.up = function (knex, Promise) {
  return knex.schema.createTable('posts', table => {
    table.uuid('id').unique().primary().notNullable()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.uuid('user_id').notNullable()
    table.foreign('user_id').references('id').inTable('users')
    table.timestamps()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('posts')
}
