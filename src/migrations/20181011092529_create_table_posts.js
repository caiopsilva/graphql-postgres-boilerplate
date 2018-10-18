exports.up = function (knex, Promise) {
  return knex.schema.createTable('posts', table => {
    table.uuid('id').unique().primary().notNullable()
    table.string('title').notNullable()
    table.string('description').notNullable()
    table.uuid('author').notNullable()
    table.foreign('author').references('id').inTable('users')
    table.timestamps()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('posts')
}
