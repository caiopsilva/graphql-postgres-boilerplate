exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('users', table => {
      table.uuid('id').unique().primary().notNullable()
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.string('password').notNullable()
    })
    .createTable('posts', table => {
      table.uuid('id').unique().primary().notNullable()
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.uuid('user_id').notNullable()
      table.foreign('user_id').references('id').inTable('users')
      table.timestamps()
    })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropIfExistsTable('users').dropIfExistsTable('posts')
}
